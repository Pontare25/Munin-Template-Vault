<%*
// Insert a decision log on the current line: "- [b] #log/decision ".
// - empty line        -> "- [b] #log/decision "
// - plain text line    -> "- [b] #log/decision " prepended, text kept
// - existing log bullet-> keep the marker, add "#log/decision " after it (once)
const MARKER = "b", TAG = "#log/decision";
const editor = app.workspace.activeEditor?.editor;
if (editor) {
  const cur = editor.getCursor();
  const line = editor.getLine(cur.line);
  const indent = (line.match(/^\s*/) || [""])[0];
  const rest = line.slice(indent.length);
  const m = rest.match(/^- \[(.)\] /);
  let out;
  if (m) {
    const body = rest.slice(m[0].length);
    out = body.includes(TAG)
      ? indent + rest
      : indent + `- [${m[1]}] ${TAG} ` + body;
  } else {
    const body = rest.trim();
    out = indent + `- [${MARKER}] ${TAG} ` + body;
  }
  editor.setLine(cur.line, out);
  editor.setCursor({ line: cur.line, ch: out.length });
}
-%>
