// Today
let parsedDate = null;

if (typeof task.deliveryDate === "string") {
  try {
    parsedDate = parseIso(task.deliveryDate)
  } catch(e) {
    parsedDate = null;
  }
} else if(task.deliveryDate instanceof Date ) {
  parsedDate = date;
}

const canEditDeliveryDate = ! task.isComplete;
const taskFullTitle = task.title;

if (task.flow) {
  taskFullTitle = `${taskFullTitle}: ${task.flow.name}`;
}

// The future:

// task instantiated as new Task(taskAttributes) effortlessly somewhere else;
task.deliveryDate // <= Guaranteed to always be either null or the Date object
task.id // <= Guaranteed to be an integer (or null if it is unsaved)
task.isPersisted // id == null, but can be overridden!
task.isValid
task.errors // Yes I like to copy rails
task.canUpdateAttribute("deliveryDate") // ! this.isComplete
task.fullTitle // That thing above
