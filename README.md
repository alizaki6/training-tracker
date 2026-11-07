# 3-Day Training Tracker — iPhone PWA

This is the same workout tracker, packaged as an installable offline web app. Full 3-day plan, weights, reps, sets, Set 2 techniques, cardio, stretching, and weekly comparisons are included.

## Publish with GitHub Pages

1. Create a **public** repository called `training-tracker` at https://github.com/new . GitHub Pages on GitHub Free supports publishing from public repositories.
2. Upload the **contents of this folder**, not the zip itself, to the root of the repo: `index.html`, `sw.js`, `manifest.webmanifest`, `.nojekyll`, and the `icons/` directory. README.md is optional.
3. Open **Settings > Pages > Build and deployment > Source > Deploy from a branch**; choose `main` and `/(root)`; save.
4. Use the published address `https://YOUR-USERNAME.github.io/training-tracker/` (substitute your GitHub username). Check the URL in **Settings > Pages**.
5. On iPhone, open the published URL in **Safari**. Share > Add to Home Screen > Open as Web App > Add.
6. Open the new Home Screen icon while online at least once. Then turn on Airplane Mode and open the app again to test offline access.
7. Record a test set, close/reopen the **Home Screen app**, and confirm it remains. Try the previous-week arrows and **History** tab.

## Important: history and backups

- The HTML file opened locally, Safari browser tabs, and installed Home Screen icon can have **different storage**. To transfer old records: use **Export backup (.json)** in the old tracker, then **Import backup** in the Home Screen app. Import replaces records currently stored in that app.
- The site's code is public in a GitHub Pages public repository, but **workout data is never uploaded** by this app. Workout data stays in browser storage on each device.
- Save JSON backups to **Files > iCloud Drive** after workouts or at least weekly. Browser storage is not an iCloud synchronization solution and can still be cleared.
- To move to a new iPhone, install the web app there and import a saved backup.
- Keep the URL/repository name unchanged after installing; changing it creates a new app storage origin.

## Update the app

Upload edited files to the same repository. If you change cached assets, increase `CACHE_NAME` in `sw.js` (`v1` to `v2`). Reload the PWA while connected to the internet. Make a JSON backup before major updates.

## Technical notes

- `index.html`: offline-capable interface and program data; no external library dependencies.
- `sw.js`: cache for offline operation (requires HTTPS or localhost).
- `manifest.webmanifest`: app metadata for iOS/Android.
- `icons/`: local icon files.
- Storage uses IndexedDB plus a synchronous localStorage fallback. When data exists in both stores, the latest `updatedAt` timestamp (`_savedAt`) wins.
