import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pageDataDir = path.join(root, "pageData");
const routeMapFile = path.join(pageDataDir, "route-map.json");
const ignoredFiles = new Set(["README.md", "AUTHORITY_LINKS.md"]);

function fail(message) {
  console.error(`pageData validation failed: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(pageDataDir)) fail(`missing directory ${pageDataDir}`);
if (!fs.existsSync(routeMapFile)) fail(`missing route map ${routeMapFile}`);
if (process.exitCode) process.exit();

const pageFiles = fs.readdirSync(pageDataDir)
  .filter((file) => file.endsWith(".md") && !ignoredFiles.has(file))
  .sort();
const routeMap = JSON.parse(fs.readFileSync(routeMapFile, "utf8"));
const routeByFile = new Map();
const paths = new Set();

for (const route of routeMap) {
  if (!route.outputFile || !route.path) {
    fail(`route record is missing outputFile or path: ${JSON.stringify(route)}`);
    continue;
  }
  if (routeByFile.has(route.outputFile)) fail(`duplicate outputFile ${route.outputFile}`);
  if (paths.has(route.path)) fail(`duplicate canonical path ${route.path}`);
  routeByFile.set(route.outputFile, route);
  paths.add(route.path);

  const fullPath = path.join(pageDataDir, route.outputFile);
  if (!fs.existsSync(fullPath)) fail(`route points to missing file ${route.outputFile}`);
}

for (const file of pageFiles) {
  const raw = fs.readFileSync(path.join(pageDataDir, file), "utf8");
  if (!/^# .+/m.test(raw)) fail(`${file} has no H1 heading`);
  if (!raw.includes("## SEO Metadata")) fail(`${file} has no SEO Metadata section`);
  if (!raw.includes("## Page Content")) fail(`${file} has no Page Content section`);
  if (!routeByFile.has(file)) fail(`${file} is not represented in route-map.json`);
}

for (const outputFile of routeByFile.keys()) {
  if (!pageFiles.includes(outputFile)) fail(`${outputFile} is in route-map.json but is not a pageData Markdown file`);
}

if (!process.exitCode) {
  console.log(`Validated ${pageFiles.length} pageData Markdown files and ${routeMap.length} route records.`);
}
