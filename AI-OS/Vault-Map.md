# Vault-Map

The navigation manual: what goes where, and how to file things. Read together with [[note-schema]], which defines what goes inside each note.

## The three layers

| Layer | Folder | Role | Who maintains it |
|---|---|---|---|
| Capture | `Fleeting/` | Your own quick notes and ideas, until promoted | Human writes, AI develops and promotes |
| Capture | `Raw/` | Outside material (sources) in transit | Human captures, AI processes |
| Knowledge | `Atlas/` | Permanent notes, compounding over time | AI maintains, human corrects |
| Schema | `AI-OS/` | How the system works | Co-evolved, human approves changes |
| Views | `Dashboards/` | Read-only views over all layers; no content of their own | Shipped with the template |

`Calendar/` (time-bound notes) and `Efforts/` (projects and areas) orbit these layers.

Knowledge flows one way: captured in `Fleeting/`, `Raw/` or a daily note, processed by [[ingest]] or [[daily-review]], compounded in `Atlas/`. Nothing valuable should live permanently in a capture folder.

## Filing rules

Ask these questions in order:

1. **Is it a date-bound record** (something that happened, was said, was thought on a day)? Then `Calendar/`: daily note, weekly note, or meeting note.
2. **Is it something to do** (a goal, a plan, a responsibility)? Then `Efforts/`: `Projects/` if it ends, `Areas/` if it does not, `Learning/` if it is a study subject. A single task is a task note (`type: task`) in `Efforts/TaskNotes/Tasks/`. Next to it, `Efforts/TaskNotes/Views/` holds the view Bases the TaskNotes plugin generates, and `Efforts/TaskNotes/Archive/` is created by the plugin the first time a task is archived.
3. **Is it a quick note or idea of your own?** Then `Fleeting/`.
4. **Is it unprocessed outside material?** Then `Raw/`: `Sources/` for external material, `Inbox/` when unsure.
5. **Is it distilled knowledge?** Then `Atlas/`: one idea is a `note`, a subject hub is a `topic`, a curated overview is a `moc`, a person or organization is an entity, a named method is a `framework`.
6. **Is it about how the vault works?** Then `AI-OS/`.
7. **Is it a template or attachment?** Then `System/`.

When two destinations seem right, prefer the one the note's `type:` implies (see the table in [[note-schema]]), and say what you chose and why.

## Template selection

Templates live in `System/Templates/` (paths below are relative to it). Pick by destination:

| Creating | Template | Lands in |
|---|---|---|
| Daily note | `Journal-templates/daily-template.md` | `Calendar/Daily Notes/` |
| Weekly note | `Journal-templates/weekly-template.md` | `Calendar/Weekly Notes/` |
| Monthly note | `Journal-templates/monthly-template.md` | `Calendar/Monthly Notes/` |
| Quarterly note | `Journal-templates/quarterly-template.md` | `Calendar/Quarterly Notes/` |
| Yearly note | `Journal-templates/yearly-template.md` | `Calendar/Yearly Notes/` |
| Meeting note | `Templater/Calendar-templates/meeting-template.md` | `Calendar/Meetings/` |
| Work session | `Templater/Calendar-templates/work-session-template.md` | `Calendar/Work Sessions/` |
| Atomic note | `Templater/Atlas-templates/atomic-note-template.md` | `Atlas/Notes/` |
| Topic page | `Templater/Atlas-templates/topic-template.md` | `Atlas/Topics/` |
| Map of Content | `Templater/Atlas-templates/moc-template.md` | `Atlas/MOCs/` |
| Person | `Templater/Atlas-templates/person-template.md` | `Atlas/Entities/People/` |
| Fleeting note | `Templater/fleeting-template.md` (applied automatically) | `Fleeting/` |
| Source capture | `Templater/source-capture-template.md` | `Raw/Inbox/` (ingest moves it to `Raw/Sources/`) |
| Area | `Templater/Effort-templates/area-template.md` | `Efforts/Areas/` |
| Project | `Templater/Effort-templates/project-template.md` | `Efforts/Projects/` |
| Task note body | `Templater/Effort-templates/task-note-template.md` (used by TaskNotes) | `Efforts/TaskNotes/Tasks/` |
| Log bullet | `Templater/Commands/log-bullet.md` (command) | At the cursor |
| Decision log line | `Templater/Commands/log-decision.md` (command) | At the cursor |
| Risk log line | `Templater/Commands/log-risk.md` (command) | At the cursor |
| New task | `Templater/Commands/new-task.md` (command) | A task note plus a reference line at the cursor |
| Promoted note | `Templater/Commands/promote-note.md` (command) | The chosen type's folder |
| Advanced log widget | `Templater/Sub-templates/Dataview queries/Advanced log template.md` | Included in project and person notes |

Organizations have no template yet; use the frontmatter pattern in [[note-schema-reference]].

## Folder indexes

Every top folder has a `README.md` stating its purpose and holding an index: one line per note, appended by the SOPs. Inside `Atlas/`, the root and each subfolder use an `index.md` instead (the OKF convention).

**Keeping them current:** every SOP that creates, renames or retires a note in `Atlas/` updates that folder's `index.md` in the same step; [[lint]] catches notes made by hand that have no line yet.

**Finding things:** follow the navigation ladder in [[query]], cheapest first: the topic page, its backlinks, a map in `Atlas/MOCs/`, the folder `index.md` or a Base from the catalogue below, and full-text search last. Never read whole folders to find one note.

## Dashboards (Bases)

Bases read frontmatter fields, which is one more reason the schema matters: notes with correct `type:` and `status:` fields appear in the right views automatically. Thirteen Bases ship with the vault:

| Base | Shows | Embedded in |
|---|---|---|
| `Efforts/Efforts.base` | All efforts grouped by `status` | `Efforts/README.md` |
| `Atlas/Topics/Topics.base` | All topic pages | `Atlas/Topics/index.md` |
| `System/Bases/Inbox.base` | Unprocessed captures in `Raw/Inbox/` | `Raw/README.md`, [[Inbox]] dashboard |
| `System/Bases/Fleeting.base` | Fleeting notes, with a Stale view | `Fleeting/README.md`, [[Inbox]] dashboard |
| `System/Bases/Tasks.base` | Task views: needs attention, overdue, waiting, by area, per project, person and period | [[Tasks]] dashboard, Areas, project, person and periodic notes |
| `System/Bases/AoR Review.base` | Every active Area with health signals | [[AoR Review]] dashboard |
| `System/Bases/Calendar.base` | Meetings and work sessions per period | Periodic notes |
| `System/Bases/Journals.base` | Periodic rollups (days into weeks, and up) | Weekly to yearly notes |
| `System/Bases/Meetings.base` | Meetings per project and person | Project and person notes |
| `System/Bases/Sessions.base` | Work sessions per project | Project notes |
| `System/Bases/Notes.base` | Child and related notes | Project and person notes |
| `System/Bases/Projects.base` | Sub projects | Project notes |
| `System/Bases/People.base` | All people | Open it directly |

The TaskNotes plugin adds seven view Bases of its own in `Efforts/TaskNotes/Views/` (tasks list, kanban, calendar, mini calendar, agenda, relationships, pomodoro stats), generated from its settings.

## The operations loop

- **Capture** (human): dump into today's daily note, `Fleeting/` or `Raw/Inbox/`. No filing decisions at capture time.
- **Ingest** (AI, [[ingest]]): process a capture into Atlas.
- **Review** (both, [[daily-review]]): sweep the daily note and the capture folders.
- **Query** (human asks, AI, [[query]]): climb the retrieval ladder, synthesize, file good answers back.
- **Lint** (AI, [[lint]]): periodic health check of the knowledge graph.
