<%*
// Promote the active note to a real type: re-apply that type's own template
// (frontmatter, sections, folder move, renames) while keeping the body already
// written. One command for every type; each type's template stays the single
// source of truth for its frontmatter and its home folder.
const types = {
  "note": "System/Templates/Templater/Atlas-templates/atomic-note-template.md",
  "topic": "System/Templates/Templater/Atlas-templates/topic-template.md",
  "person": "System/Templates/Templater/Atlas-templates/person-template.md",
  "meeting": "System/Templates/Templater/Calendar-templates/meeting-template.md",
  "work-session": "System/Templates/Templater/Calendar-templates/work-session-template.md",
  "project": "System/Templates/Templater/Effort-templates/project-template.md",
  "source": "System/Templates/Templater/source-capture-template.md",
};

const file = app.workspace.getActiveFile();
const editor = app.workspace.activeEditor?.editor;
if (!file) {
  new Notice("Promote: no active note.");
} else {
  // Read the body BEFORE the template runs, since the template moves the file.
  // Drop the old frontmatter and the Promote button; both are re-supplied by
  // the target template (the button only belongs on unpromoted captures).
  const current = editor ? editor.getValue() : tp.file.content;
  // Carry the original capture date forward: created-date marks when the note
  // was captured, not when it was promoted. Pull it from the old frontmatter
  // before stripping; the target template would otherwise reset it to now.
  const oldFm = (current || "").match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const oldCd = oldFm ? oldFm[1].match(/^created-date:[ \t]*(.+?)[ \t]*$/m) : null;
  const origCreated = oldCd ? oldCd[1] : null;
  const body = (current || "")
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "")
    .replace(/```meta-bind-button[\s\S]*?```\r?\n?/g, "")
    .trim();

  const labels = Object.keys(types);
  const target = await tp.system.suggester(labels, labels, false, "Promote to which type?");
  if (target) {
    const tplFile = app.vault.getAbstractFileByPath(types[target]);
    if (!tplFile) {
      new Notice(`Promote: template missing for "${target}".`);
    } else {
      // Rendering the template runs its own tp.file.move / rename / prompts.
      let out = await tp.file.include(tplFile);

      // Restore the original capture date over the template's fresh now-stamp.
      if (origCreated) {
        out = out.replace(/^(created-date:)[ \t]*.*$/m, `$1 ${origCreated}`);
      }

      // Splice the preserved body in at the template's cursor marker: the spot
      // the type intends for written content. Falls back to just after the
      // frontmatter, then to the end of the file.
      // Build the cursor-tag delimiters by concatenation. A literal Templater
      // open/close tag anywhere in this file (even in a comment) is scanned by
      // Templater's Eta compiler and aborts parsing of this command, so the
      // open (less-than percent) and close (percent greater-than) sequences
      // must never appear intact in this source. Assemble them from halves.
      const O = "<" + "%", C = "%" + ">";
      const cursorSrc = O + "\\s*tp\\.file\\.cursor\\([^)]*\\)\\s*" + C;
      if (new RegExp(cursorSrc).test(out)) {
        out = out.replace(new RegExp(cursorSrc), body);
      } else if (/^---\r?\n[\s\S]*?\r?\n---\r?\n/.test(out)) {
        out = out.replace(/^(---\r?\n[\s\S]*?\r?\n---\r?\n)/, `$1\n${body}\n`);
      } else {
        out = `${out}\n\n${body}\n`;
      }
      // Any remaining markers would show up as literal text: we write the file
      // ourselves, so Templater's cursor jumper never gets to strip them.
      out = out.replace(new RegExp(cursorSrc, "g"), "");

      // Write through the editor when one is open, so the in-memory buffer does
      // not save over the change afterwards.
      if (editor) {
        editor.setValue(out);
      } else {
        await app.vault.modify(file, out);
      }
      new Notice(`Promoted to ${target}: ${file.path}`);
    }
  }
}
-%>
