# TODO LIST

- [ ] **[MEDIUM]** Add BookHavenBookstore_Sophia to the chat workspace repo list
  - Type: feature
  - Description: The chat workspace pill dropdown is populated from the hardcoded `ATTACH_REPOS` array in `claudeSheet.js`, which currently lists only `rsterenchak/toDoList_TOP` and `rsterenchak/matchingGame-test`. The worker's `ALLOWED_TARGETS` has since added `rsterenchak/BookHavenBookstore_Sophia`, but the app's hardcoded list wasn't updated, so the new repo doesn't appear as a selectable workspace. Add `'rsterenchak/BookHavenBookstore_Sophia'` to the `ATTACH_REPOS` array in `claudeSheet.js` so it appears in the workspace pill dropdown. Confirm: after the change, the pill dropdown lists all three repos; selecting BookHaven sets `activeChatRepo` correctly and chat/inject calls send `body.repo` as `rsterenchak/BookHavenBookstore_Sophia`. The repo must already be in the worker's `ALLOWED_TARGETS` (it is) for injection to succeed once selected.
  - File: `toDoList_main/src/claudeSheet.js`
  - Completed: YYYY-MM-DD (PR #<number>)
  <!-- id: f7880e36-9350-4010-bc1b-cfcd745d4b51 -->
