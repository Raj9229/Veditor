[33mcommit 107b22bec0ac1e9c2960538a58ed73d1fd9d8137[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m
Author: Raj Gupta <krishnagupta9229@gmail.com>
Date:   Sun Aug 23 23:06:13 2026 +0530

    ui design -user and editor

[1mdiff --git a/src/app/App.jsx b/src/app/App.jsx[m
[1mindex 235dc77..364cc53 100644[m
[1m--- a/src/app/App.jsx[m
[1m+++ b/src/app/App.jsx[m
[36m@@ -5,7 +5,19 @@[m [mfunction App() {[m
 [m
   return ([m
 [m
[31m-    <main className="w-full h-screen bg-gray-900"></main>[m
[32m+[m[32m    <main className="w-full h-screen bg-gray-900 flex gap-4 p-4">[m
[32m+[m
[32m+[m[32m      <aside className="h-full w-1/4 bg-amber-50 rounded-lg">[m
[32m+[m[32m      </aside>[m
[32m+[m
[32m+[m[32m      <section className="w-3/4 bg-neutral-800 rounded-lg">[m
[32m+[m[41m      [m
[32m+[m[32m      </section>[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m
[32m+[m[32m    </main>[m
 [m
     [m
 [m
