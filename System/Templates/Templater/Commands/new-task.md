<%*
// New task (Ctrl+Alt+T): ask for the context (personal or work), then open TaskNotes'
// own "Create new inline task" window with that context filled in; after you save, the
// link TaskNotes inserts becomes a task reference line:
//   "- [t] [[task - <title>|<title>]]"
// - empty line or empty bullet ("- ") -> the reference goes on that line
// - text line -> TaskNotes puts the reference on a new line below, at the same indent
// - line that already links a task note -> opens that task's edit dialog (no new task)
// The line keeps a checkbox on purpose: the task note's Log section is a Dataview TASK
// query, which only sees checkbox lines, so this line shows up there. "[t]" renders
// as checked, so it never looks like an open to-do; log queries count a [t] line that
// links a task note as a task reference. It is "t", not "x": TaskNotes offers to convert every [ ] and
// [x] line into a task note, and a reference line already has one. It does not sync with the task's status. Complete
// tasks on the task card.
// origin: is set to the note you are in (where the task was created).
// up: is never inferred from the note you are in (most tasks start in daily and
// meeting notes); set the project yourself in the dialog. area: is then copied
// from that project (its top-level Area), so Area filters work outside Bases.
// How: TaskNotes has no creation callback API, so this command shadows the plugin's
// handleInlineTaskCreated for one call and removes the shadow afterwards (also when the
// window is cancelled). TaskNotes' own command (left unbound in this vault) is never changed.
// If an update renames that method, the window still works, just without the prefix.
const tn = app.plugins.plugins.tasknotes;
const editor = app.workspace.activeEditor?.editor;
const host = app.workspace.getActiveFile();
if (!tn || !editor || !host || typeof tn.createInlineTask !== "function") {
  new Notice("New task: open a note in an editor (TaskNotes must be enabled).");
} else {
  const line = editor.getLine(editor.getCursor().line);
  // Line already links a task note: open that task instead of making a new one
  let linked = null;
  for (const lm of line.matchAll(/\[\[([^\]|#]+)/g)) {
    const f = app.metadataCache.getFirstLinkpathDest(lm[1], host.path);
    if (f && app.metadataCache.getFileCache(f)?.frontmatter?.type === "task") { linked = f; break; }
  }
  if (linked) {
    await tn.openTaskEditModalForFile(linked);
  } else {
    // Context first: TaskNotes reads its default context when the window opens, so set it
    // for this one window and put the setting back right after. Escape cancels the task.
    const context = await tp.system.suggester(["Personal", "Work"], ["personal", "work"], false, "Context for this task?");
    if (!context) return;
    // Drop a stale shadow left by an earlier run, then install this run's shadow.
    // restore() removes only this run's shadow, so this run's cancel timer never
    // deletes the shadow of a later capture.
    if (Object.prototype.hasOwnProperty.call(tn, "handleInlineTaskCreated")) delete tn.handleInlineTaskCreated;
    const orig = tn.handleInlineTaskCreated;
    // TaskNotes inserts on the same line only when it is blank; otherwise on a new line
    const movedDown = line.trim() !== "";
    let shadow = null;
    const restore = () => { if (tn.handleInlineTaskCreated === shadow) delete tn.handleInlineTaskCreated; };
    shadow = tn.handleInlineTaskCreated = function (task, ctx) {
      restore();
      orig.call(this, task, ctx);
      try {
        const ed = ctx.editor, ln = ctx.insertionPoint.line, cur = ed.getLine(ln);
        if (!/\[\[/.test(cur)) return;
        let indent = (cur.match(/^\s*/) || [""])[0];
        const ref = cur.slice(indent.length).replace(/^[-*+] (\[.\] )?/, "").replace(/^#task\s+/, "");
        let at = ln;
        const prev = movedDown && ln > 0 ? ed.getLine(ln - 1) : null;
        if (prev !== null && /^\s*[-*+]( \[.\])?\s*$/.test(prev)) {
          // Empty bullet: TaskNotes moved to a new line; put the reference back on it
          indent = (prev.match(/^\s*/) || [""])[0];
          ed.replaceRange("", { line: ln - 1, ch: prev.length }, { line: ln, ch: 0 });
          at = ln - 1;
        } else if (prev !== null) {
          // Text line: keep the reference at the same indent as the line above
          indent = (prev.match(/^\s*/) || [""])[0];
        }
        ed.setLine(at, indent + "- [t] " + ref);
        ed.setCursor({ line: at, ch: ed.getLine(at).length });
        // origin: the note the task was created in (daily, meeting, ...)
        const file = app.vault.getAbstractFileByPath(task.path);
        // contexts: the one picked above, if the window left it empty
        // area: the top-level Area of the project picked in the window (its own
        // area:, else walk up: to an Area with no parent Area)
        const clean = (v) => typeof v === "string" ? v.replace(/^\[\[/, "").replace(/\]\]$/, "").split("|")[0] : "";
        const topArea = (name) => {
          for (let i = 0; i < 6 && name; i++) {
            const f = app.metadataCache.getFirstLinkpathDest(name, "");
            const pfm = f ? app.metadataCache.getFileCache(f)?.frontmatter : null;
            if (!pfm) return "";
            const own = clean([].concat(pfm.area ?? [])[0]);
            if (own) return own;
            const up = clean([].concat(pfm.up ?? [])[0]);
            if (pfm.type === "area" && !up) return f.basename;
            name = up;
          }
          return "";
        };
        if (file) app.fileManager.processFrontMatter(file, (fm) => {
          fm.origin = "[[" + host.basename + "]]";
          if (!fm.contexts || (Array.isArray(fm.contexts) && fm.contexts.length === 0)) fm.contexts = [context];
          const area = topArea(clean([].concat(fm.up ?? [])[0]));
          if (area && !fm.area) fm.area = ["[[" + area + "]]"];
        });
      } catch (e) {
        console.error("New task:", e);
      }
    };
    const defaults = tn.settings.taskCreationDefaults;
    const prevContexts = defaults.defaultContexts;
    defaults.defaultContexts = context;
    try {
      await tn.createInlineTask(editor);
    } finally {
      defaults.defaultContexts = prevContexts;
    }
    // Cancelled window: drop the shadow 10 s after the window is gone (a saved task has
    // been created and has removed the shadow itself by then)
    const modal = [...document.querySelectorAll(".modal-container")].pop();
    const timer = setInterval(() => {
      if (!modal || !modal.isConnected) { clearInterval(timer); setTimeout(restore, 10000); }
    }, 500);
  }
}
-%>
