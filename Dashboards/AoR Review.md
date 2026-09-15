---
type: dashboard
created-date: 2026-09-15
summary: Areas-of-responsibility review — every Area with health signals in one sweep. The GTD 20k-ft check the weekly/monthly digest doesn't cover.
---
# Areas of Responsibility — Review

Every Area you're responsible for, in one sweep. Run this monthly (the [[monthly-template|monthly note]] links here). Read the flags top-down, then work the checklist below.

## Project health

Per Area: active projects and any past their due date. 🔴 = no active project **or** something past due · 🟢 = clear.

![[AoR Review.base]]

## Task loops

Areas carrying overdue or unscheduled tasks. Overdue = a past due date; needs-scheduling = no due, scheduled, or start date. (Tasks are note-level, invisible to Bases, so this strip is Dataview; the vault-wide view lives in [[Tasks]].)

```dataviewjs
const areas = dv.pages('"Efforts/Areas"').where(p => p.type === "area");
const today = dv.date("today");
const rows = [];
for (const a of areas) {
  const projs = dv.pages('"Efforts/Projects"')
    .where(p => p.type === "project" && dv.func.contains(p.related, a.file.link));
  let overdue = 0, needsSched = 0;
  for (const p of [a, ...projs]) {
    for (const t of p.file.tasks) {
      if (t.completed) continue;
      if (t.due && t.due < today) overdue++;
      else if (!t.due && !t.scheduled && !t.start) needsSched++;
    }
  }
  if (overdue || needsSched) rows.push([a.file.link, overdue || "", needsSched || ""]);
}
rows.sort((x, y) => (Number(y[1]) || 0) - (Number(x[1]) || 0));
if (rows.length) dv.table(["Area", "Overdue", "Needs scheduling"], rows);
else dv.paragraph("*No overdue or unscheduled tasks in any Area.*");
```
