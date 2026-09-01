import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const dataDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(dataDirectory, "../..");
const nationalApiRoutePath = path.join(
  projectRoot,
  "src/app/api/national-opportunities/route.ts"
);
const nationalDetailRoutePath = path.join(
  projectRoot,
  "src/app/api/national-opportunities/[id]/route.ts"
);
const nationalFavoritesRoutePath = path.join(
  projectRoot,
  "src/app/api/national-opportunities/favorites/route.ts"
);
const nationalMainPath = path.join(
  projectRoot,
  "src/components/national-opportunities/nacional-main.tsx"
);
const showcaseDataPath = path.join(
  dataDirectory,
  "showcase-national-opportunities.json"
);

const CURRENT_DATE_FILTER_REGEX = /applicationDeadline[\s\S]*CURRENT_DATE/;
const SHOWCASE_RENDER_REGEX = /<NacionalShowcase \/>/;
const EXPIRED_SHOWCASE_DATE = "2026-09-01";

test("public national APIs exclude opportunities whose deadline has passed", async () => {
  for (const routePath of [
    nationalApiRoutePath,
    nationalDetailRoutePath,
    nationalFavoritesRoutePath,
  ]) {
    const source = await readFile(routePath, "utf8");
    assert.match(source, CURRENT_DATE_FILTER_REGEX);
  }
});

test("national catalog renders a curated showcase", async () => {
  const source = await readFile(nationalMainPath, "utf8");
  assert.match(source, SHOWCASE_RENDER_REGEX);
});

test("national showcase ships only currently open official opportunities", async () => {
  const opportunities = JSON.parse(await readFile(showcaseDataPath, "utf8"));

  assert.equal(opportunities.length, 3);
  assert.deepEqual(
    opportunities.map(({ name }) => name),
    [
      "FEBRACE 2027",
      "Olimpíada Nacional de Empreendedorismo (ONE) 2026",
      "Olimpíada Nacional de Eficiência Energética (ONEE) 2026",
    ]
  );

  for (const opportunity of opportunities) {
    assert.ok(opportunity.applicationDeadline > EXPIRED_SHOWCASE_DATE);
    assert.match(opportunity.officialLink, /^https:\/\//);
  }
});
