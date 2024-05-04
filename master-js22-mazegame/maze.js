const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const width = window.innerWidth;
const height = window.innerHeight;
const borderWidth = 4;
const cols = 10; // Spalten des Labyrinths
const rows = 7; // Zeilen des Labyrinths - wenn die beiden gleich sind ist es viel einfacher zu erzeugen
const colWidth = width / cols;
const rowHeight = height / rows;
const maxSpeed = 5;
const incSpeed = 1;
const engine = Engine.create();
engine.world.gravity.y = 0;
const startTime=new Date();
let won = false;

const { world } = engine;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: false,
  },
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const renderBorderOptions = {
  fillStyle: "white",
  strokeStyle: "solid",
};
const renderWallOptions = {
  fillStyle: "white",
  strokeStyle: "solid",
};
const walls = [
  Bodies.rectangle(width / 2, 0, width, borderWidth, {
    isStatic: true,
    render: renderBorderOptions,
  }),
  Bodies.rectangle(0, height / 2, borderWidth, height, {
    isStatic: true,
    render: renderBorderOptions,
  }),
  Bodies.rectangle(width / 2, height, width, borderWidth, {
    isStatic: true,
    render: renderBorderOptions,
  }),
  Bodies.rectangle(width, height / 2, borderWidth, height, {
    isStatic: true,
    render: renderBorderOptions,
  }),
];
World.add(world, walls);

// #region maze generation

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

// #region der einfache, naheliegende Weg
/*
const grid=[];
for (let i=0;i<3;i++) {
    grid.push([]);
    for (let j=0; j<3;j++) {
        grid[i].push(false);
    }
}
*/
// #endregion
const grid = Array(rows)
  .fill(null)
  .map(() => Array(cols).fill(false)); // mittels map wird eine Kopie angelegt, d. h. die inneren drei Arrays sind unterschiedlichw
// #endregion maze generation

const grid2 = Array(rows).fill(Array(cols).fill(false)); // geht nicht, weil das innere Array 3 mal das gleiche ist, d. h. wenn man
// ein inneres Array verändern will, verändert man alle drei gleich

const verticals = Array(rows)
  .fill(null)
  .map(() => Array(cols - 1).fill(false));

const horizontals = Array(rows - 1)
  .fill(null)
  .map(() => Array(cols).fill(false));

const startRow = Math.floor(Math.random() * rows);
const startCol = Math.floor(Math.random() * cols);

const stepThroughCell = (row, column) => {
  if (grid[row][column]) return; // If I have visited the cell at {row, column], then return
  grid[row][column] = true; // mark cell as visited

  // assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, "up"],
    [row, column + 1, "right"],
    [row + 1, column, "down"],
    [row, column - 1, "left"],
  ]);

  // for each neighbor ...
  for (let neighbor of neighbors) {
    const [nextRow, nextCol, direction] = neighbor;
    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
      // see if that neighbor is out of bounds
      continue; // der aktuelle Nachbar ist ungültig, daher nix weiter mit ihm machen
    }
    if (grid[nextRow][nextCol]) continue; // if we have visited that neighbor, continue to nex neighbor

    // remove a wall from either horizontals or verticals array
    if (direction === "left") {
      verticals[row][column - 1] = true;
    } else if (direction === "right") {
      verticals[row][column] = true;
    } else if (direction === "up") {
      horizontals[row - 1][column] = true;
    } else {
      horizontals[row][column] = true;
    }

    stepThroughCell(nextRow, nextCol); // visit that next cell
  }
};

stepThroughCell(startRow, startCol);

horizontals.forEach((row, rowIdx) => {
  row.forEach((open, colIdx) => {
    if (open) return;
    const wall = Bodies.rectangle(
      colIdx * colWidth + colWidth / 2,
      (rowIdx + 1) * rowHeight,
      colWidth,
      1,
      { label: "wall", isStatic: true, render: renderWallOptions }
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIdx) => {
  row.forEach((open, colIdx) => {
    if (open) return;
    const wall = Bodies.rectangle(
      (colIdx + 1) * colWidth,
      rowIdx * rowHeight + rowHeight / 2,
      1,
      rowHeight,
      { label: "wall", isStatic: true, render: renderWallOptions }
    );
    World.add(world, wall);
  });
});

// #region goal
const goal = Bodies.rectangle(
  width - colWidth / 2,
  height - rowHeight / 2,
  0.8 * colWidth,
  0.8 * rowHeight,
  { isStatic: true, label: "goal",
    render: {
        fillStyle: 'green'
    }
   }
);
World.add(world, goal);
// #endregion

// #region ball
const ball = Bodies.circle(colWidth / 2, rowHeight / 2, Math.min(colWidth / 3,rowHeight / 3), {
  label: "ball",render: {
    fillStyle: 'blue'
  }
});
World.add(world, ball);

// #endregion

// #region keypress handler
document.addEventListener("keydown", (event) => {
  const { x, y } = ball.velocity;
  if (event.key === "w") {
    Body.setVelocity(ball, { x, y: Math.max(y - incSpeed, -maxSpeed) });
  } else if (event.key === "a") {
    Body.setVelocity(ball, { x: Math.max(x - incSpeed, -maxSpeed), y });
  } else if (event.key === "s") {
    Body.setVelocity(ball, { x, y: Math.min(y + incSpeed, maxSpeed) });
  } else if (event.key === "d") {
    Body.setVelocity(ball, { x: Math.min(x + incSpeed, maxSpeed), y });
  }
  //console.log('velocity = (',ball.velocity.x,' /',ball.velocity.y,')');
});
// #endregion

// #region Win condition
Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    const labels = ["ball", "goal"];
    if (
      labels.includes(collision.bodyA.label) &&
      labels.includes(collision.bodyB.label)
    ) {
      if (!won) {
        won=true;
        let timeNeeded = (new Date())-startTime;
        document.querySelector('.duration').innerText = `${Math.round(timeNeeded/100)/10} seconds needed`; // eine Nachkommastelle ...
        document.querySelector('.winner').classList.remove('hidden');
      }

      world.gravity.y = 1;
      world.bodies.forEach(body => {
        if (body.label === 'wall') {
            Body.setStatic(body,false);
        }
      })
    }
  });
});
// #endregion

// #region restart game 
document.querySelector('#restartButton').addEventListener('click',() => {
    location.reload();
})
// #endregion
