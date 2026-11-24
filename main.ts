import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I finally hit inbox zero, and my email provider sent me a congratulations email.";

// Validation guard: the entry must be exactly one sentence, 1-200
// characters, not only whitespace, with no leading/trailing space and
// no newline, so it always passes the competition gate.
const text = LINE;
if (text.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (text !== text.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}
const terminators = (text.match(/[.!?]/g) ?? []).length;
if (terminators !== 1 || !/[.!?]$/.test(text)) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, text, "utf8");
