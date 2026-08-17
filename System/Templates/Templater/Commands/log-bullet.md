<%*
// Insert or cycle the current line's log bullet marker.
// - empty line       -> "- [b] "
// - plain text line  -> "- [b] " prepended
// - existing checkbox-> cycle the marker: b -> i -> p -> c -> b
//   (any non-log marker, e.g. " " or "x", enters the cycle at "b")
const cycle = ["b", "i", "p", "c", "*"];
const editor = app.workspace.activeEditor?.editor;
if (editor) {
  const cur = editor.getCursor();
  const line = editor.getLine(cur.line);
  const indent = (line.match(/^\s*/) || [""])[0];
  const rest = line.slice(indent.length);
  const m = rest.match(/^- \[(.)\] /);
  if (m) {
    const idx = cycle.indexOf(m[1]);
    const next = idx === -1 ? "b" : cycle[(idx + 1) % cycle.length];
    const out = indent + rest.replace(/^- \[.\] /, `- [${next}] `);
    editor.setLine(cur.line, out);
    editor.setCursor(cur); // marker swap keeps line length; keep cursor put
  } else {
    const out = rest.trim() === "" ? indent + "- [b] " : indent + "- [b] " + rest;
    editor.setLine(cur.line, out);
    editor.setCursor({ line: cur.line, ch: out.length });
  }
}
-%>
