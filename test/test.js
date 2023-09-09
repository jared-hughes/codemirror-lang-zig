import { zigLanguage } from "../dist/index.js";
import { fileTests } from "@lezer/generator/dist/test";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const caseDir = path.dirname(fileURLToPath(import.meta.url));

for (let file of fs.readdirSync(caseDir)) {
  if (!/\.txt$/.test(file)) continue;

  const filename = /^[^\.]*/.exec(file)[0];
  describe(filename, () => {
    for (let { name, run } of fileTests(
      fs.readFileSync(path.join(caseDir, file), "utf8"),
      file
    ))
      it(name, () => run(zigLanguage.parser));
  });
}
