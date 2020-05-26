import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
} from "./constants";

export class Model {
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
    this.observers = [];
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {
        const stateTmp = Array.from(new Array(this.height), () =>
          Array.from(new Array(this.width), () => CELL_STATES.NONE)
        );
        for (let x = 0; x < this.width; x++) {
          for (let y = 0; y < this.width; y++) {
            stateTmp[y][x] = this.state[y][x];
          }
        }
        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            if (this.isCellAlive(i, j) && (nbAlive < 2 || nbAlive > 3)) {
              stateTmp[j][i] = CELL_STATES.DEAD;
            } else if (nbAlive === 3) {
              stateTmp[j][i] = CELL_STATES.ALIVE;
            }
          }
        }
        this.state = stateTmp;
        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    this.stop();
    this.init();
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.height &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }

  aliveNeighbours(x, y) {
    let number = 0;
    let i;
    for (i = x - 1; i < x + 2; i++) {
      number += this.isCellAlive(i, y - 1);
    }
    for (i = x - 1; i < x + 2; i++) {
      number += this.isCellAlive(i, y + 1);
    }
    for (i = x - 1; i < x + 2; i += 2) {
      number += this.isCellAlive(i, y);
    }
    return number;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  updated() {
    var self = this;
    this.observers.forEach(observer => {
      observer.update(self);
    });
  }
}
