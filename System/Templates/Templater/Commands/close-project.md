<%*
// Close project: run from a project note (its Close project button, or the command
// palette). Asks Done or Dropped, sets status and date_end to today, then jumps to the
// Retro section so you can write what worked and what to change. The note stays where
// it is; the monthly review moves closed efforts to Archive/ through Obsidian.
const file = app.workspace.getActiveFile();
const fm = file ? app.metadataCache.getFileCache(file)?.frontmatter : null;
if (!file || fm?.type !== "project") {
  new Notice("Close project: open a project note first.");
} else {
  const status = await tp.system.suggester(["Done", "Dropped"], ["done", "dropped"], false, "Close this project as?");
  if (status) {
    await app.fileManager.processFrontMatter(file, (f) => {
      f.status = status;
      f.date_end = tp.date.now("YYYY-MM-DD");
    });
    const editor = app.workspace.activeEditor?.editor;
    if (editor) {
      const at = editor.getValue().split("\n").findIndex(l => /Retro/.test(l));
      if (at >= 0) { editor.setCursor({ line: at, ch: 0 }); editor.scrollIntoView({ from: { line: at, ch: 0 }, to: { line: at, ch: 0 } }, true); }
    }
    new Notice(`Project closed as ${status}. Fill in the Retro.`);
  }
}
-%>
