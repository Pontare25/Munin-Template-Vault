<%*
// Startup template (Settings, Templater, Startup templates): runs once when Obsidian
// starts. Templater gives every template command the same Templater icon, and has no
// setting to change it, so the phone toolbar shows identical buttons. This sets a
// distinct icon on each command. Icons are Lucide names; the first one this Obsidian
// version knows is used. Add a row here when you add a command to the toolbar.
const ICONS = {
  "Commands/log-bullet.md": ["list-plus"],
  "Commands/new-task.md": ["square-check-big", "check-square"],
  "Commands/promote-note.md": ["circle-arrow-up", "arrow-up-circle"],
};
const known = new Set(tp.obsidian.getIconIds());
const base = "templater-obsidian:System/Templates/Templater/";
for (const [file, names] of Object.entries(ICONS)) {
  const cmd = app.commands.commands[base + file];
  const icon = names.find((n) => known.has(n) || known.has("lucide-" + n));
  if (cmd && icon) cmd.icon = icon;
}
// Redraw the phone toolbar if it was built before the icons were set.
try { app.mobileToolbar?.compileToolbar?.(); } catch (e) { /* desktop: no toolbar */ }
-%>
