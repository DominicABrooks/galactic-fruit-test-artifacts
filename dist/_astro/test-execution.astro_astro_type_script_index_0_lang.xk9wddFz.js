document.addEventListener("DOMContentLoaded", () => {
    const m = document.querySelectorAll(".build-item"), p = document.getElementById("empty-state"), a = document.getElementById("test-cases-view"), c = document.getElementById("test-detail-view"), x = document.getElementById("test-cases-body"), g = document.getElementById("back-to-table"); let u = null; m.forEach(s => { s.addEventListener("click", () => { const d = s.dataset.id; v(d) }) }); function v(s) {
        u = s; const d = window.appData.builds.find(e => e.id === s), t = window.appData.testCases[s] || []; m.forEach(e => { const i = e.querySelector(".active-indicator"); e.dataset.id === s ? (e.classList.add("bg-white/5", "border-white/10"), i.classList.remove("opacity-0")) : (e.classList.remove("bg-white/5", "border-white/10"), i.classList.add("opacity-0")) }), p.classList.add("hidden"), c.classList.add("hidden"), a.classList.remove("hidden"), document.getElementById("selected-build-name").textContent = d.name, document.getElementById("selected-build-meta").textContent = `${d.date} • ${d.status}`; const l = t.length, o = t.filter(e => e.status === "Pass").length, r = t.filter(e => e.status === "Fail").length; document.getElementById("stat-total").textContent = l, document.getElementById("stat-pass").textContent = o, document.getElementById("stat-fail").textContent = r, x.innerHTML = t.map(e => `
                <tr class="hover:bg-white/5 cursor-pointer transition-colors group" onclick="window.viewTestCase('${e.id}')">
                    <td class="px-6 py-4 font-mono text-Galactic Fruit-muted group-hover:text-white">${e.id}</td>
                    <td class="px-6 py-4 font-medium text-white">${e.name}</td>
                    <td class="px-6 py-4">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${e.status === "Pass" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}">
                            ${e.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-Galactic Fruit-muted truncate max-w-xs">${e.notes || "-"}</td>
                </tr>
            `).join("")
    } window.viewTestCase = s => {
        const t = window.appData.testCases[u].find(n => n.id === s), l = window.appData.testSteps[s] || []; a.classList.add("hidden"), c.classList.remove("hidden"), document.getElementById("detail-name").textContent = t.name, document.getElementById("detail-id").textContent = t.id; const o = document.getElementById("detail-status"); o.textContent = t.status, o.className = `text-xs px-2 py-0.5 rounded-full border ${t.status === "Pass" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`; const r = document.getElementById("steps-container"); r.innerHTML = l.map(n => `
                <div class="relative">
                    <div class="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-Galactic Fruit-panel border border-white/20 flex items-center justify-center text-xs text-Galactic Fruit-muted font-mono">
                        ${n.step}
                    </div>
                    <div class="bg-white/[0.02] border border-white/5 rounded-lg p-4 hover:border-white/10 transition-colors">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <div class="text-xs text-Galactic Fruit-muted uppercase tracking-wider mb-1">Action</div>
                                <div class="text-sm text-white">${n.action}</div>
                            </div>
                            <div>
                                <div class="text-xs text-Galactic Fruit-muted uppercase tracking-wider mb-1">Expected Result</div>
                                <div class="text-sm text-Galactic Fruit-text">${n.expected}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join(""); const e = document.getElementById("defect-panel"), i = document.getElementById("defect-notes"); t.status === "Fail" && t.notes ? (e.classList.remove("hidden"), i.textContent = t.notes) : e.classList.add("hidden")
    }, g.addEventListener("click", () => { c.classList.add("hidden"), a.classList.remove("hidden") })
});
