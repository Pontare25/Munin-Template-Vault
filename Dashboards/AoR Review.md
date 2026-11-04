---
type: dashboard
date_created: 2026-09-15
summary: Areas-of-responsibility review — every Area with health signals in one sweep. The GTD 20k-ft check the weekly/monthly digest doesn't cover.
---
# Areas of Responsibility — Review

Every Area you're responsible for, in one sweep. Run this monthly (the [[monthly-template|monthly note]] links here). Read the flags top-down, then work the checklist below.

## Project health

Per Area: active projects and any past their due date. 🔴 = no active project **or** something past due · 🟢 = clear.

![[AoR Review.base]]

## Task loops

Areas carrying overdue or unscheduled tasks: open task notes whose `up:` chain reaches the Area. Overdue = a past due date; needs a due date = no due date (new tasks are scheduled for today by default, so the scheduled date says little). (Counting per Area is a rollup Bases can't do, so this strip is Dataview; the vault-wide view lives in [[Tasks]].)

The strip uses the same rule as the Area boards and the By area column in [[Tasks]]: a task belongs to the outermost Area on the chain of its first `up:` value (up to five steps). Subtasks, sub-project tasks and a sub-Area's tasks all count toward the top Area, and a task with several `up:` values counts once.

```dataviewjs
const today = dv.date("today");
// Same rule as the area formula in System/Bases/Tasks.base: follow the first up: value
// up to five steps and give the task to the outermost type: area on that chain.
const firstUp = p => { const u = [].concat(p?.up ?? [])[0]; return u?.path ? dv.page(u.path) : null; };
const counts = new Map();
const tasks = dv.pages('"Efforts/TaskNotes/Tasks"')
  .where(t => t.type === "task" && !["done", "dropped"].includes(t.status));
for (const t of tasks) {
  let area = null, p = t;
  for (let step = 0; step < 5; step++) {
    p = firstUp(p);
    if (!p) break;
    if (p.type === "area") area = p;
  }
  if (!area) continue;
  const c = counts.get(area.file.path) ?? { link: area.file.link, overdue: 0, noDue: 0 };
  const due = t.date_due;
  if (due && dv.date(due) < today) c.overdue++;
  else if (!due) c.noDue++;
  counts.set(area.file.path, c);
}
const rows = [...counts.values()]
  .filter(c => c.overdue || c.noDue)
  .map(c => [c.link, c.overdue || "", c.noDue || ""]);
rows.sort((x, y) => (Number(y[1]) || 0) - (Number(x[1]) || 0));
if (rows.length) dv.table(["Area", "Overdue", "Needs a due date"], rows);
else dv.paragraph("*No overdue or unscheduled tasks in any Area.*");
```
