function farmManager(input) {
  let n = parseInt(input.shift());
  let farmers = {};

  
  for (let i = 0; i < n; i++) {
    let [name, area, tasks] = input.shift().split(" ");
    farmers[name] = { area, tasks: tasks ? tasks.split(",") : [] };
  }

 
  while (input.length) {
    let command = input.shift();
    if (command === "End") break;

    let [action, name, ...params] = command.split(" / ");

    if (action === "Execute") {
      let [area, task] = params;

      if (
        farmers[name] &&
        farmers[name].area === area &&
        farmers[name].tasks.includes(task)
      ) {
        console.log(`${name} has executed the task: ${task}!`);
      } else {
        console.log(`${name} cannot execute the task: ${task}.`);
      }

    } else if (action === "Change Area") {
      let newArea = params[0];
      if (farmers[name]) {
        farmers[name].area = newArea;
        console.log(`${name} has changed their work area to: ${newArea}`);
      }

    } else if (action === "Learn Task") {
      let newTask = params[0];
      if (farmers[name]) {
        if (farmers[name].tasks.includes(newTask)) {
          console.log(`${name} already knows how to perform ${newTask}.`);
        } else {
          farmers[name].tasks.push(newTask);
          console.log(`${name} has learned a new task: ${newTask}.`);
        }
      }
    }
  }

  
  for (let [name, info] of Object.entries(farmers)) {
    let tasks = info.tasks.length > 0 ? info.tasks.slice().sort().join(", ") : "";
    console.log(`Farmer: ${name}, Area: ${info.area}, Tasks: ${tasks}`);
  }
}



farmManager([
  "4",
  "Mia garden planting,weeding",
  "Ethan barn milking,feeding",
  "Sophia apiary honeycomb,beeswax",
  "Liam field plowing,irrigating",
  "Execute / Mia / garden / planting",
  "Learn Task / Ethan / cleaning",
  "Change Area / Sophia / field",
  "Execute / Liam / field / plowing",
  "Execute / Ethan / barn / cleaning",
  "End"
]
);
