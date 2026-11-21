import { describe, expect, it } from "vitest";
import { newGame, type Snake, tick, turn } from "./snake";

const game = (overrides: Partial<Snake>): Snake => ({ ...newGame(10, 5, () => 0), ...overrides });

describe("snake", () => {
  it("moves one cell per tick in its direction", () => {
    const start = game({ food: [9, 0] });
    expect(tick(start).body).toEqual([
      [4, 2],
      [3, 2],
      [2, 2],
    ]);
  });

  it("grows and scores when it eats", () => {
    const next = tick(game({ food: [4, 2] }), () => 0);
    expect(next.score).toBe(1);
    expect(next.body).toHaveLength(4);
    expect(next.food).not.toEqual([4, 2]);
  });

  it("ignores a turn straight back, even after a turn queued in the same step", () => {
    const start = game({ food: [9, 0] });
    expect(turn(start, "left").direction).toBe("right");
    expect(turn(turn(start, "up"), "left").direction).toBe("up");
    expect(tick(turn(turn(start, "up"), "left")).over).toBe(false);
  });

  it("ends at a wall or its own body", () => {
    expect(tick(game({ body: [[9, 2]], food: [0, 0] })).over).toBe(true);
    const curled = game({
      body: [
        [2, 2],
        [2, 3],
        [3, 3],
        [3, 2],
        [3, 1],
      ],
      heading: "up",
      direction: "right",
      food: [0, 0],
    });
    expect(tick(curled).over).toBe(true);
  });

  it("may move into the cell its tail leaves", () => {
    const loop = game({
      body: [
        [2, 2],
        [2, 3],
        [3, 3],
        [3, 2],
      ],
      heading: "up",
      direction: "right",
      food: [0, 0],
    });
    expect(tick(loop).over).toBe(false);
  });
});
