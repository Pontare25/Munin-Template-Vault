<%*
// Insert a risk log on the current line: "- [c] #log/risk ".
// - empty line        -> "- [c] #log/risk "
// - plain text line    -> "- [c] #log/risk " prepended, text kept
// - existing log bullet-> keep the marker, add "#log/risk " after it (once)
const MARKER = "c", TAG = "#log/risk";
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
