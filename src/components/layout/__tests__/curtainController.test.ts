import { beforeEach, describe, expect, it, vi } from "vitest";

type CurtainModule = typeof import("../curtainController");

let module: CurtainModule;

beforeEach(async () => {
  vi.resetModules();
  module = await import("../curtainController");
});

describe("curtainController", () => {
  it("runs the same state machine for every site route", async () => {
    const routes = [
      ["/", "Belis Agency · São Paulo"],
      ["/portfolio", "Audiovisual Studio · São Paulo"],
      ["/websites", "Web Studio · São Paulo"],
      ["/sistemas", "Software Studio · São Paulo"],
      ["/sobre", "Belis Agency · São Paulo"],
      ["/contato", "Contato · São Paulo"],
    ] as const;

    for (const [destination, label] of routes) {
      const covered = module.curtain.cover(destination);

      expect(module.curtain.getSnapshot()).toEqual({
        phase: "covering",
        destination,
        label,
      });

      module.curtain.covered();
      await expect(covered).resolves.toBe(true);
      expect(module.curtain.getPhase()).toBe("covered");

      module.curtain.reveal();
      expect(module.curtain.getPhase()).toBe("revealing");

      module.curtain.settle();
      expect(module.curtain.getPhase()).toBe("idle");
      expect(module.curtain.getSnapshot().destination).toBe("");
    }
  });

  it("keeps query and hash while deriving the route label from pathname", () => {
    void module.curtain.cover("/websites?ref=nav#cases");

    expect(module.curtain.getSnapshot()).toMatchObject({
      destination: "/websites?ref=nav#cases",
      label: "Web Studio · São Paulo",
    });
  });

  it("lets only one navigation own an active transition", async () => {
    const first = module.curtain.cover("/portfolio");
    const second = module.curtain.cover("/contato");

    await expect(second).resolves.toBe(false);
    expect(module.curtain.getSnapshot().destination).toBe("/portfolio");

    module.curtain.covered();
    await expect(first).resolves.toBe(true);
  });

  it("notifies subscribers for each valid phase change only", () => {
    const listener = vi.fn();
    const unsubscribe = module.curtain.subscribe(listener);

    void module.curtain.cover("/sistemas");
    module.curtain.reveal();
    module.curtain.covered();
    module.curtain.covered();
    module.curtain.reveal();
    module.curtain.settle();

    expect(listener).toHaveBeenCalledTimes(4);

    unsubscribe();
    void module.curtain.cover("/sobre");
    expect(listener).toHaveBeenCalledTimes(4);
  });
});
