<p align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0f766e&height=170&section=header&text=npm%20script%20graph&fontSize=36&fontColor=ffffff&animation=twinkling" alt="Animated wave header"/></p>
<p align="center"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=2800&pause=900&color=14B8A6&center=true&vCenter=true&width=760&lines=npm%20script%20graph%20%7C%20inspect%20before%20you%20run" alt="Animated title"/></p>
<p align="center"><img src="https://img.shields.io/github/license/CyberLoop-dev/npm-script-graph?style=for-the-badge" alt="License"/> <img src="https://img.shields.io/github/languages/top/CyberLoop-dev/npm-script-graph?style=for-the-badge" alt="Language"/> <img src="https://img.shields.io/github/stars/CyberLoop-dev/npm-script-graph?style=for-the-badge" alt="Stars"/> <img src="https://img.shields.io/github/last-commit/CyberLoop-dev/npm-script-graph?style=for-the-badge" alt="Last commit"/></p>
<p align="center"><img src="assets/mark.svg" alt="npm-script-graph project mark" width="520"/></p>

## 🧭 Overview

`npm-script-graph` reads a `package.json` and turns references such as `npm run build` inside scripts into a dependency graph. It is a static inspection tool: it never executes project scripts.

## ✨ Features

- 🔎 Extracts `npm run` and `npm run-script` references from script commands
- 🧩 Reports references to scripts that do not exist
- 🔁 Detects dependency cycles with a readable cycle path
- 🧭 Prints a dependency-first order when the graph is valid
- 🛡️ Reads package metadata only; it never invokes a shell

## 🧪 Demo

Run `node src/cli.js sample/package.json`. The output lists the graph, missing references, cycles, and a suggested order. No hosted demo is published.

## 🚀 Quick Start

```bash
node src/cli.js sample/package.json
node src/cli.js path/to/package.json --json
npm test
```

Requires Node.js 18 or newer. No package installation is needed.

## 🧰 Tech Stack

- **Stack:** Node.js (built-in modules only)
- **Design:** read-only static analysis with no shell execution

## 🗂️ Folder Structure

```text
npm-script-graph/
├── assets/mark.svg
├── sample/package.json
├── src/cli.js
├── tests/analyze.test.js
├── package.json
├── .gitignore
├── LICENSE
└── README.md
```

## 🛣️ Roadmap

- 🧩 Add optional pnpm and Yarn script-reference parsing
- 📈 Add Graphviz DOT output for larger graphs

## 🤝 Contributing

Issues and focused pull requests are welcome. Keep changes small, explain the use case, and add tests for behavior changes. Run the project using Quick Start before submitting.

## 📄 License

Released under the [MIT License](LICENSE).

<p align="center"><img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f766e,100:0f172a&height=120&section=footer&animation=twinkling" alt="Animated wave footer"/></p>
