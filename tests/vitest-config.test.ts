import config from "../vitest.config";
import eslintConfig from "../eslint.config.mjs";
import { describe, expect, it } from "vitest";

describe("vitest config", () => {
  it("ignores auxiliary git worktrees", () => {
    expect(config.test?.exclude).toContain(".worktrees/**");
  });
});

describe("eslint config", () => {
  it("ignores auxiliary git worktrees", () => {
    const ignoreEntries = eslintConfig
      .flatMap((entry) => ("ignores" in entry ? [entry.ignores] : []))
      .filter(Boolean);

    expect(ignoreEntries).toContainEqual(
      expect.arrayContaining([".worktrees/**"]),
    );
  });
});
