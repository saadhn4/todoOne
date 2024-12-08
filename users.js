import readline from "readline-sync";
import fs from "fs/promises";

async function registerUser() {
  let db = await fs.readFile("db.json", "utf-8");
  let convertedDB = JSON.parse(db);

  let userNameInput = readline.question("Enter username:");
  let passwordInput = readline.question("Enter password:");

  let check = convertedDB.users.some((x) => x.username === userNameInput);

  if (check) {
    console.log("User already exists... Select another");
    return;
  } else {
    console.log("Registered succesfully!!");
  }

  let newUser = { username: userNameInput, password: passwordInput, tasks: [] };

  convertedDB.users.push(newUser);

  let convertBack = JSON.stringify(convertedDB);

  await fs.writeFile("db.json", convertBack);
}

async function loginUser() {
  let db = await fs.readFile("db.json", "utf-8");
  let convertedDB = JSON.parse(db);

  let userNameInput = readline.question("Enter username:");
  let passwordInput = readline.question("Enter password:");

  let check = convertedDB.users.find(
    (x) => x.username === userNameInput && x.password === passwordInput
  );

  if (check) {
    console.log("Login succesful");
    return check;
  } else {
    console.log("Not valid credentials...");
    return null;
  }
}

async function addTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("Log in first...");
    return;
  }

  let db = await fs.readFile("db.json", "utf-8");

  let convertDB = JSON.parse(db);

  let titleInput = readline.question("Enter title:");
  let descInput = readline.question("Enter desc:");

  let check = convertDB.users.find((x) => x.username === loggedInUser.username);

  let tasksObject = {
    id: Date.now(),
    Title: titleInput,
    Description: descInput,
  };

  check.tasks.push(tasksObject);

  let convertBack = JSON.stringify(convertDB);

  await fs.writeFile("db.json", convertBack);

  console.log("Task added succesfully");
}

async function editTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("Go and log in first...");
    return;
  }

  let db = await fs.readFile("db.json", "utf-8");
  let convertDB = JSON.parse(db);

  let check = convertDB.users.find((x) => x.username === loggedInUser.username);

  if (check.tasks.length === 0) {
    console.log("No tasks found");
  }

  console.log("Your tasks:");

  check.tasks.map((x) => console.log(`${x.id} ${x.Title}`));

  let userID = readline.questionInt("Enter id:");

  let checkID = check.tasks.find((x) => x.id === userID);

  if (checkID) {
    let newTitle = readline.question("Enter new Title:");
    let newDesc = readline.question("Enter description:");

    checkID.Title = newTitle || checkID.Title;
    checkID.Description = newDesc || checkID.Description;

    let convertBack = JSON.stringify(convertDB);

    await fs.writeFile("db.json", convertBack);

    console.log("Task edited succesfully!!!");
  } else {
    console.log("Invalid id!!!");
  }
}

export { registerUser, loginUser, addTask, editTask };
