import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const LINE = "I quit. Effective immediately, my two weeks' notice will be served by the autocomplete that wrote this sentence.";

function main(): void {
  const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDirectory, { recursive: true });
  const outputFile = `${outputDirectory}/entry.txt`;
  writeFileSync(outputFile, `${LINE}\n`, "utf8");
  const characterCount = readFileSync(outputFile, "utf8").trim().length;
  if (characterCount === 0 || characterCount > 140) {
    throw new Error(`Competition gate failed: entry must contain 1–140 characters; got ${characterCount}.`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
