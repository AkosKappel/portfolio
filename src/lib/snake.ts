/** Rules of the terminal's snake game, kept free of timers and rendering so they are easy to test. */

export type Point = [x: number, y: number];
export type Direction = "up" | "down" | "left" | "right";

export type Snake = {
  width: number;
  height: number;
  /** Head first. */
  body: Point[];
  /** The direction of the last step; a turn straight back into it is ignored. */
  heading: Direction;
  direction: Direction;
  food: Point;
  score: number;
  over: boolean;
};

const STEPS: Record<Direction, Point> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

const same = (a: Point, b: Point) => a[0] === b[0] && a[1] === b[1];

function placeFood(width: number, height: number, body: Point[], random: () => number) {
  const free: Point[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!body.some((part) => same(part, [x, y]))) free.push([x, y]);
    }
  }
  return free[Math.floor(random() * free.length)];
}

export function newGame(width: number, height: number, random = Math.random): Snake {
  const y = Math.floor(height / 2);
  const body: Point[] = [
    [3, y],
    [2, y],
    [1, y],
  ];
  return {
    width,
    height,
    body,
    heading: "right",
    direction: "right",
    food: placeFood(width, height, body, random),
    score: 0,
    over: false,
  };
}

export function turn(game: Snake, direction: Direction): Snake {
  return direction === OPPOSITE[game.heading] ? game : { ...game, direction };
}

export function tick(game: Snake, random = Math.random): Snake {
  if (game.over) return game;
  const [dx, dy] = STEPS[game.direction];
  const head: Point = [game.body[0][0] + dx, game.body[0][1] + dy];
  const eats = same(head, game.food);
  // The tail moves away this step unless the snake grows, so the head may take its place.
  const body = eats ? game.body : game.body.slice(0, -1);
  const outside = head[0] < 0 || head[1] < 0 || head[0] >= game.width || head[1] >= game.height;
  if (outside || body.some((part) => same(part, head))) return { ...game, over: true };
  const next = [head, ...body];
  const food = eats ? placeFood(game.width, game.height, next, random) : game.food;
  return {
    ...game,
    body: next,
    heading: game.direction,
    food: food ?? game.food,
    score: game.score + (eats ? 1 : 0),
    // A full board leaves no room for food: the game is won and over.
    over: eats && !food,
  };
}
