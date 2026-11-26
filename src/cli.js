import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export function analyzeScripts(scripts = {}) {
  const names = new Set(Object.keys(scripts));
  const graph = {};
  const missing = [];
  for (const [name, command] of Object.entries(scripts)) {
    const deps = [...String(command).matchAll(/\bnpm\s+(?:run|run-script)\s+([A-Za-z0-9:_-]+)/g)].map(m => m[1]);
    graph[name] = [...new Set(deps)];
    for (const dep of graph[name]) if (!names.has(dep)) missing.push({ from: name, target: dep });
  }
  const state = new Map(), stack = [], cycles = [], order = [];
  function visit(name) {
    if (state.get(name) === 2) return;
    if (state.get(name) === 1) {
      const start = stack.indexOf(name);
      cycles.push([...stack.slice(start), name]);
      return;
    }
    state.set(name, 1); stack.push(name);
    for (const dep of graph[name] || []) if (names.has(dep)) visit(dep);
    stack.pop(); state.set(name, 2); order.push(name);
  }
  for (const name of names) visit(name);
  return { graph, missing, cycles, order: [...new Set(order)] };
}
function main(argv) {
  const file = argv.find(x => !x.startsWith("--")) || "package.json";
  const json = argv.includes("--json");
  let pkg;
  try { pkg = JSON.parse(fs.readFileSync(path.resolve(file), "utf8")); }
  catch (error) { console.error(`Cannot read package file: ${error.message}`); process.exitCode = 2; return; }
  const result = analyzeScripts(pkg.scripts || {});
  if (json) console.log(JSON.stringify({ file: path.resolve(file), ...result }, null, 2));
  else {
    console.log(`Script graph: ${file}\n`);
    for (const [name, deps] of Object.entries(result.graph)) console.log(`- ${name}: ${deps.length ? deps.join(", ") : "(no npm script dependencies)"}`);
    if (result.missing.length) console.log("\nMissing targets:", result.missing.map(x => `${x.from} -> ${x.target}`).join("; "));
    if (result.cycles.length) console.log("\nCycles:", result.cycles.map(x => x.join(" -> ")).join("; "));
    if (!result.missing.length && !result.cycles.length) console.log("\nSuggested dependency-first order:", result.order.join(" -> "));
  }
  if (result.missing.length || result.cycles.length) process.exitCode = 1;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main(process.argv.slice(2));
