# Changelog

## [2.2.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v2.1.0...v2.2.0) (2026-11-04)


### Features

* **meetings:** minutes fields, copy button and detailed views ([d237d14](https://github.com/Pontare25/Munin-Template-Vault/commit/d237d146a3416341c684ad18e6b4d8cd0ade02d9))

## [2.1.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v2.0.0...v2.1.0) (2026-11-04)


### Features

* **bases:** readable date column labels ([b866ac8](https://github.com/Pontare25/Munin-Template-Vault/commit/b866ac895b4717d30c38b8ecbc4b04680da58d07))
* **status:** projects drop simmering ([929e945](https://github.com/Pontare25/Munin-Template-Vault/commit/929e94504093e71d1a8053c656c68e1bd8a597e5))


### Bug Fixes

* **fleeting:** show the Promote button only on fleeting notes ([2f870df](https://github.com/Pontare25/Munin-Template-Vault/commit/2f870dfd0e7e7e25b91f0b5b37acb5144319b40d))
* **tasks:** task reference lines use [t] so TaskNotes stops offering conversion ([017a64e](https://github.com/Pontare25/Munin-Template-Vault/commit/017a64eda0f8ceeae5a824bb2a53292df99c50d4))


### Documentation

* **tasks:** explain the blockedBy Properties warning ([e0f0784](https://github.com/Pontare25/Munin-Template-Vault/commit/e0f0784f9350d569f94d31fd13e5da3be225152d))

## [2.0.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.13.0...v2.0.0) (2026-11-04)


### ⚠ BREAKING CHANGES

* the Tasks plugin is no longer installed. Tasks are TaskNotes notes in Efforts/TaskNotes/Tasks, captured with Ctrl+Alt+T; inline `- [ ]` tasks with emoji dates and ```tasks query blocks are no longer read by any view.
* date properties are renamed. Migrate existing notes: created-date -> date_created; updated -> date_modified; start-date -> date_start; due-date -> date_due; end-date -> date_end; meeting and work-session date -> date_start; journal-date removed (Journals dateField now reads date). Types: date_created, date_modified, date_start, date_end, date_due are datetime; date and birthday are date.

### Features

* Munin template v2.0.0 ([c8e3475](https://github.com/Pontare25/Munin-Template-Vault/commit/c8e3475d7506ebc54155833543d8e943ee927462))
* replace the Tasks plugin with TaskNotes ([7871691](https://github.com/Pontare25/Munin-Template-Vault/commit/7871691b4586e0d1caafcf124f777d369654fa1e))
* ship the template without example notes ([64d6362](https://github.com/Pontare25/Munin-Template-Vault/commit/64d63626acfe9f056a37f97bb73cf017c4df1408))
* standardize date properties to date_&lt;what&gt; ([3098050](https://github.com/Pontare25/Munin-Template-Vault/commit/3098050a61873eb810d9c4c611c73050fa674904)), closes [#142](https://github.com/Pontare25/Munin-Template-Vault/issues/142)
* **status:** one status vocabulary with a Meta Bind selector ([185a315](https://github.com/Pontare25/Munin-Template-Vault/commit/185a315cfd07846d6a76b92eab03e06eba7cae09)), closes [#140](https://github.com/Pontare25/Munin-Template-Vault/issues/140)
* **tasks:** adopt TaskNotes on the date_&lt;what&gt; convention ([1a44b3a](https://github.com/Pontare25/Munin-Template-Vault/commit/1a44b3a5ffbc181affc8fe6c79949d92a0695329)), closes [#143](https://github.com/Pontare25/Munin-Template-Vault/issues/143)
* **tasks:** capture tasks with Ctrl+Alt+T and keep them in the log trail ([bc337fa](https://github.com/Pontare25/Munin-Template-Vault/commit/bc337fa81edc3ce427e60889eeebefaea931dd37))
* **tasks:** task views for journals, projects, people, Areas and the dashboard ([daaa333](https://github.com/Pontare25/Munin-Template-Vault/commit/daaa333df279bce1d640390438082a6acc76296b))


### Bug Fixes

* **config:** bind Alt+E explicitly, make command templates insert-only ([958100e](https://github.com/Pontare25/Munin-Template-Vault/commit/958100ee7fe042c27a073f2f2a5a2d46fcb70ec7))
* **tasks:** AoR Task loops count Areas with the Tasks.base rule ([6c3f08d](https://github.com/Pontare25/Munin-Template-Vault/commit/6c3f08df2e3797a76ffd5e1f2e6d1df969ae6186)), closes [#150](https://github.com/Pontare25/Munin-Template-Vault/issues/150)
* **tasks:** keep the capture override when a cancelled run's timer fires ([7d08bfb](https://github.com/Pontare25/Munin-Template-Vault/commit/7d08bfbc18c151a7f00eb2f4285cd870fcf501e1)), closes [#151](https://github.com/Pontare25/Munin-Template-Vault/issues/151)


### Documentation

* guides match the shipped vault after a cold read-through ([79b6b11](https://github.com/Pontare25/Munin-Template-Vault/commit/79b6b11eaffb12703bfcc917e248181a629e2427))
* guides read without example notes ([0643ab5](https://github.com/Pontare25/Munin-Template-Vault/commit/0643ab5c5a7521350f812e2a473c439487625f1c)), closes [#157](https://github.com/Pontare25/Munin-Template-Vault/issues/157)
* guides teach the TaskNotes workflow ([18f3519](https://github.com/Pontare25/Munin-Template-Vault/commit/18f3519f1626e1bd782bb9b7457c6752760a8e3c)), closes [#153](https://github.com/Pontare25/Munin-Template-Vault/issues/153)
* note that TaskNotes' $ contexts shortcut stays on ([347f7ff](https://github.com/Pontare25/Munin-Template-Vault/commit/347f7ff8ea62433245e7379347865f57f91c3ff6)), closes [#153](https://github.com/Pontare25/Munin-Template-Vault/issues/153)

## [1.13.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.12.0...v1.13.0) (2026-09-15)


### Features

* AoR review sweep dashboard (Refs [#136](https://github.com/Pontare25/Munin-Template-Vault/issues/136)) ([dd9180b](https://github.com/Pontare25/Munin-Template-Vault/commit/dd9180bdf1f702ac4b77e36d5e102f8ff992752f))
* **appearance:** add headingDots snippet ([d9fb0b2](https://github.com/Pontare25/Munin-Template-Vault/commit/d9fb0b2215809af5f8e4eda19753f73fd7c5d37e))
* **capture:** generic Promote note command (re-template + move) ([49b2751](https://github.com/Pontare25/Munin-Template-Vault/commit/49b2751414cb0aaa4ac57e946c96ce1587857811)), closes [#127](https://github.com/Pontare25/Munin-Template-Vault/issues/127)
* **logs:** decisions as first-class — log widget rollup + write commands ([4e307f8](https://github.com/Pontare25/Munin-Template-Vault/commit/4e307f80d5ce59eeeb93c8e12d4a67a0b62b4be1))


### Bug Fixes

* AoR base — asFile() for backlink props, scope to Efforts/Areas (Refs [#136](https://github.com/Pontare25/Munin-Template-Vault/issues/136)) ([802c827](https://github.com/Pontare25/Munin-Template-Vault/commit/802c827c1645383e3cb460ae152c48907632b00e))
* **capture:** make Promote work end-to-end, preserve capture date, doc device settings ([aa371c1](https://github.com/Pontare25/Munin-Template-Vault/commit/aa371c1350b528389a56755c0635795937a4fe59))
* **fleeting:** don't prompt for a name on link-created notes ([74aec06](https://github.com/Pontare25/Munin-Template-Vault/commit/74aec06d16c8f11cbc4c635d5906fbda533ffbb9))


### Documentation

* close unmatched paren in START-HERE periodic-notes paragraph ([eba8900](https://github.com/Pontare25/Munin-Template-Vault/commit/eba89007944f472db818b8c9cc4aef35342af7ed))

## [1.12.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.11.0...v1.12.0) (2026-09-05)


### Features

* **capture:** inbox dashboard with Fleeting and Raw Inbox bases ([d31dee7](https://github.com/Pontare25/Munin-Template-Vault/commit/d31dee73d241efd668309b8235cece8f5fcbdf6c)), closes [#126](https://github.com/Pontare25/Munin-Template-Vault/issues/126)

## [1.11.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.10.0...v1.11.0) (2026-08-27)


### Features

* **okf:** add zero-dependency Atlas type: check ([30058e0](https://github.com/Pontare25/Munin-Template-Vault/commit/30058e05cb3571937193b79fa758e0b1389f99f9)), closes [#117](https://github.com/Pontare25/Munin-Template-Vault/issues/117)
* **routing:** document the agent routing procedure and SOP trigger index ([de20af6](https://github.com/Pontare25/Munin-Template-Vault/commit/de20af675fbdad561e205da8922b62bd84c0471b))


### Documentation

* reframe README positioning and add mobile-git guidance ([dfa2ac4](https://github.com/Pontare25/Munin-Template-Vault/commit/dfa2ac40dbcdf11a16d0d8ac3b137665a7588db8))

## [1.10.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.9.1...v1.10.0) (2026-08-26)


### Features

* **dashboards:** add vault-wide task dashboard ([ab935d8](https://github.com/Pontare25/Munin-Template-Vault/commit/ab935d8d383a737ed026029592b7f66e09381695))
* **periodic:** add quarterly and yearly journal notes ([2936e59](https://github.com/Pontare25/Munin-Template-Vault/commit/2936e5980239af0a4049c53777a40f6d70de116e))


### Documentation

* **okf:** remove references to the deleted export tooling ([#118](https://github.com/Pontare25/Munin-Template-Vault/issues/118)) ([35cfbed](https://github.com/Pontare25/Munin-Template-Vault/commit/35cfbed9be054ac5660070ee6fab7013c95ca772))

## [1.9.1](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.9.0...v1.9.1) (2026-08-20)


### Documentation

* **guide:** add linking-notes-and-maps guide + list in START-HERE ([94a36e5](https://github.com/Pontare25/Munin-Template-Vault/commit/94a36e56f786b0a72eb414f9a061597127eb9c42))
* **research:** knowledge-layer research + signed-off decisions ([2858369](https://github.com/Pontare25/Munin-Template-Vault/commit/28583694e92b094742ddf9d4e0baef26922eb416))

## [1.9.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.8.0...v1.9.0) (2026-08-18)


### Features

* **bases:** group weekly rollup by weekday, add people/day to calendar ([31e859a](https://github.com/Pontare25/Munin-Template-Vault/commit/31e859a8ba0a856e387cee62cad8a3856a79bcf6))
* **template:** auto-fill up: when nesting a sub-project ([a37a3ef](https://github.com/Pontare25/Munin-Template-Vault/commit/a37a3efc98eb5edb1e59384f7c4b686a872e953f))
* **template:** optional parent-folder nesting for sub-projects ([8267ee1](https://github.com/Pontare25/Munin-Template-Vault/commit/8267ee19e597de2c01b74a8373385a50470612ec))


### Bug Fixes

* **bases:** exclude work-sessions from Notes child-notes view ([7399827](https://github.com/Pontare25/Munin-Template-Vault/commit/73998275540093617c0ff76e0f3f25eac9537b1b))
* **bases:** relationship fields must be list-form to roll up ([134ee9f](https://github.com/Pontare25/Munin-Template-Vault/commit/134ee9ffc624580bf0d36826751c2e8e2d83cfa2))

## [1.8.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.7.0...v1.8.0) (2026-08-18)


### Features

* add skills and interests fields to person notes ([46d576d](https://github.com/Pontare25/Munin-Template-Vault/commit/46d576d7cfa5a6f0ac473952017b2807bb6c302d))
* unify people field across templates, bases, and schema ([30eae63](https://github.com/Pontare25/Munin-Template-Vault/commit/30eae63ef9b9b9a854bcfc490688316c3d81de80))


### Documentation

* document effort date fields in note schema ([b2bab0a](https://github.com/Pontare25/Munin-Template-Vault/commit/b2bab0a0f81c7f762fc708320053fe1a0e7dfcb0))

## [1.7.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.6.0...v1.7.0) (2026-08-17)


### Features

* monthly digest rollup and day-to-month base view (F5) ([29b7a1f](https://github.com/Pontare25/Munin-Template-Vault/commit/29b7a1fdd57b6fe18e13f17b78add1006d458ee9))
* monthly notes, journal rollup hierarchy, hotkeys, Start Here guides ([9da6c93](https://github.com/Pontare25/Munin-Template-Vault/commit/9da6c9347f5729c7a94f3dca6c2ef101e2d7e381))
* weekly note template — week rollup, review, and meetings (F3) ([4677e65](https://github.com/Pontare25/Munin-Template-Vault/commit/4677e656b5f3e007ec4c175c3c6b84a0c7b695ca))

## [1.6.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.5.0...v1.6.0) (2026-08-14)


### Features

* finalize daily note template ([43fb066](https://github.com/Pontare25/Munin-Template-Vault/commit/43fb0660ad6f530df519f554081f8e2269564177))
* Fleeting folder template for frictionless capture ([d9a1a8b](https://github.com/Pontare25/Munin-Template-Vault/commit/d9a1a8b15eff315f942bad4094bff7b56a6ca0b8))
* periodic notes via Journals plugin ([ddbf0a5](https://github.com/Pontare25/Munin-Template-Vault/commit/ddbf0a576080f0b6b3a286db9faa36777dfa2d54))
* redesign daily note template ([df4979a](https://github.com/Pontare25/Munin-Template-Vault/commit/df4979a6762d7aa3ef0e0d5676727898d98f707c))


### Documentation

* add doc-on-ship, frontmatter governance, and minimal-tags rules ([441b025](https://github.com/Pontare25/Munin-Template-Vault/commit/441b02541e9dbccb73b5fa314fb83d7df292d9fd))
* refine daily task-capture hint ([928c7c0](https://github.com/Pontare25/Munin-Template-Vault/commit/928c7c09bd663d23e2f34dbdb6c5eaaca8df34e4))

## [1.5.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.4.0...v1.5.0) (2026-08-11)


### Features

* decisions and #log/* taxonomy ([6e10316](https://github.com/Pontare25/Munin-Template-Vault/commit/6e1031662ba414d9e471db548543bbaa9b452351)), closes [#53](https://github.com/Pontare25/Munin-Template-Vault/issues/53)
* task/log logging system with project rollups, guides, and worked example ([71af313](https://github.com/Pontare25/Munin-Template-Vault/commit/71af31315709531429408056af20802510d62279))


### Documentation

* cross-link Munin-System-Individual sibling template ([d48d776](https://github.com/Pontare25/Munin-Template-Vault/commit/d48d776d85225e1a8bdc261f60e94590a2734387))
* drop stale Munin-System-Individual cross-link ([69a3195](https://github.com/Pontare25/Munin-Template-Vault/commit/69a319514bc921288c2a5d9fec78f04d677f095e))
* mark WIP, document Fleeting capture layer, fix example-note lint ([c3e7fa4](https://github.com/Pontare25/Munin-Template-Vault/commit/c3e7fa4892b55dfaa48fe4965283926c51673272))

## [1.4.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.3.2...v1.4.0) (2026-07-08)


### Features

* bundle omnisearch and text-extractor plugins with the vault ([c99c311](https://github.com/Pontare25/Munin-Template-Vault/commit/c99c311cda0d63b6d0c3d8bc257a9133e4d4cf2b))


### Bug Fixes

* point daily-notes at the relocated daily template ([5ed6e1a](https://github.com/Pontare25/Munin-Template-Vault/commit/5ed6e1ac293b05030128edd357c333674a59049d))


### Documentation

* document bundled plugins and text-extractor OCR languages ([040628e](https://github.com/Pontare25/Munin-Template-Vault/commit/040628e19b74b1745e97241c35f6ba43af93298f))

## [1.3.2](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.3.1...v1.3.2) (2026-07-08)


### Documentation

* add shared-active-efforts epic and federation dry-run prompts ([446226f](https://github.com/Pontare25/Munin-Template-Vault/commit/446226fb4308588fdb975d2ff75d99833d4dfb66))
* fix garbled setup step, document single-account and private-invite paths ([861a3c0](https://github.com/Pontare25/Munin-Template-Vault/commit/861a3c0c2afc5824c1341dd40cadfc74b2a5040e))

## [1.3.1](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.3.0...v1.3.1) (2026-07-08)


### Documentation

* add company-admin and rollout federation guides ([6791f1a](https://github.com/Pontare25/Munin-Template-Vault/commit/6791f1a79b60abdf3ee8c2a0ca4af15355f76444))
* document private-repo access for federation rollout ([afefb05](https://github.com/Pontare25/Munin-Template-Vault/commit/afefb05c420de8a5c35d4eedbda2c605373e86f1))

## [1.3.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.2.0...v1.3.0) (2026-07-08)


### Features

* add vault federation (pull, suggest, contribute, govern) ([9a1b6c5](https://github.com/Pontare25/Munin-Template-Vault/commit/9a1b6c5fb78803dae898be4bb9985d6715ab52a8))


### Documentation

* add federation design spec, plan, SOPs, and non-git user guide ([8e25e22](https://github.com/Pontare25/Munin-Template-Vault/commit/8e25e220f1b25364e3d91a89efa029aba6648934))

## [1.2.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.1.1...v1.2.0) (2026-07-07)


### Features

* OKF v0.1 conformance for the Atlas bundle ([d9c5747](https://github.com/Pontare25/Munin-Template-Vault/commit/d9c5747fe919adf046912f5b44019675d8980a75))

## [1.1.1](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.1.0...v1.1.1) (2026-07-06)


### Documentation

* drop hardcoded SOP count from onboarding prompt ([0e87da6](https://github.com/Pontare25/Munin-Template-Vault/commit/0e87da68026104f031332d8e5f23e9f8b820ca86))

## [1.1.0](https://github.com/Pontare25/Munin-Template-Vault/compare/v1.0.0...v1.1.0) (2026-07-06)


### Features

* add query SOP with a retrieval ladder ([7655316](https://github.com/Pontare25/Munin-Template-Vault/commit/76553169359ccdad6577c55cb5e7648354c1ec4f))
* add recommended description field to knowledge notes ([eb855a8](https://github.com/Pontare25/Munin-Template-Vault/commit/eb855a8de9d6d925abfd3e72b2ad873ade7435f0))


### Bug Fixes

* exclude generated CHANGELOG from markdownlint ([053b044](https://github.com/Pontare25/Munin-Template-Vault/commit/053b0445299dd7cf3bca226c319f0f4fdbbd5f3a))
* keep documented empty folders in git ([3999285](https://github.com/Pontare25/Munin-Template-Vault/commit/39992851b0ef559d7f6b6a114f94bb5d3b42da8f))


### Documentation

* add contradiction check to new-note dedupe step ([243e7d5](https://github.com/Pontare25/Munin-Template-Vault/commit/243e7d59accc32941f517f6829c4a6363822fd48))
* document index-to-Base handoff at scale ([e4921bc](https://github.com/Pontare25/Munin-Template-Vault/commit/e4921bc96ce98e983a2aa4d42eeb5bd85d979691))
* encourage stating why a compass link exists ([b83109b](https://github.com/Pontare25/Munin-Template-Vault/commit/b83109b40453efdd60a1688057de537e36f1e419))
* fix three doc contradictions found in onboarding test ([e383547](https://github.com/Pontare25/Munin-Template-Vault/commit/e38354714e5e07ea1fac6efe98ba066cd984b90f))
* ingest covers pasted sources and cited-author entity stubs ([6e9e0ea](https://github.com/Pontare25/Munin-Template-Vault/commit/6e9e0eac4c60f823bdc78eff2632db8111fdc559))
* recommend obsidian-skills and reframe manual setup ([93fe677](https://github.com/Pontare25/Munin-Template-Vault/commit/93fe6773fee912215484a3fcd4e3ca1ecfa6ad9d))

## 1.0.0 (2026-07-05)


### Features

* AI-OS core - Me.md, Vault-Map, SOPs, guides, log (L2) ([a4ffa16](https://github.com/Pontare25/Munin-Template-Vault/commit/a4ffa16d7404be9e56bf6e7c9b892c5dfe91abf0))
* onboarding prompt, CI workflows, and contributor docs (L4) ([dc30ff6](https://github.com/Pontare25/Munin-Template-Vault/commit/dc30ff6987ac936b084f600cf69c50386e4ac6d2))
* templates, bases, and worked example set (L3) ([a4ad8cb](https://github.com/Pontare25/Munin-Template-Vault/commit/a4ad8cbb04fa12ca457c1bb47c3b255d2359268e))
* vault skeleton, folder indexes, and note schema (L1) ([a73c526](https://github.com/Pontare25/Munin-Template-Vault/commit/a73c52607794b3c6d9e6031ff64ddbb17f673877))


### Documentation

* add MIT license ([63d5f5e](https://github.com/Pontare25/Munin-Template-Vault/commit/63d5f5e7a1da83cd269201862405eeafbb5d57f1))
