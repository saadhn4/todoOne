import readline from "readline-sync";
import fs from "fs/promises";

async function register() {
  let db = await fs.readFile("db.json", "utf-8");

  let convert = JSON.parse(db);

  let usernameInput = readline.question("Enter username:");
  let passwordInput = readline.question("Enter password:");

  let check = convert.users.some((x) => x.username === usernameInput);

  if (check) {
    console.log("User already exists");
    return;
  } else {
    console.log("User registered Succesfully");
  }
  let newUserObj = {
    username: usernameInput,
    password: passwordInput,
    tasks: [],
  };

  convert.users.push(newUserObj);

  let convertBack = JSON.stringify(convert);

  await fs.writeFile("db.json", convertBack);
}

async function login() {
  let db = await fs.readFile("db.json", "utf-8");

  let convertDB = JSON.parse(db);

  let usernameInput = readline.question("Enter username:");
  let passwordInput = readline.question("Enter password:");

  let check = convertDB.users.find(
    (x) => x.username === usernameInput && x.password === passwordInput
  );

  if (check) {
    console.log("Log in succesful!");
    return check;
  } else {
    console.log("Invalid credentials...");
    return;
  }
}

async function addTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("Log in first!!");
    return null;
  }

  let db = await fs.readFile("db.json", "utf-8");

  let convertDB = JSON.parse(db);

  let titleInput = readline.question("Enter title:");
  let descInput = readline.question("Enter description:");

  let check = convertDB.users.find((x) => x.username === loggedInUser.username);

  let newTask = { id: Date.now(), Title: titleInput, Description: descInput };

  check.tasks.push(newTask);

  let convertBack = JSON.stringify(convertDB);
  await fs.writeFile("db.json", convertBack);

  console.log("Task added succesfully!!!");
}

async function editTask(loggedInUser) {
  if (!loggedInUser) {
    console.log("Go and log in first!");
    return;
  }

  let db = await fs.readFile("db.json", "utf-8");
  let convertDB = JSON.parse(db);

  let check = convertDB.users.find((x) => x.username === loggedInUser.username);

  if (check.tasks.length === 0) {
    console.log("No tasks found");
    return;
  }

  console.log("Your tasks:");
  check.tasks.map((x) =>
    console.log(`id: ${x.id} Title: ${x.Title} Description: ${x.Description}`)
  );

  let userIDInput = readline.questionInt("Enter id:");

  let checkID = check.tasks.find((x) => x.id === userIDInput);

  if (checkID) {
    let newTitle = readline.question("Enter New Title:");
    let newDesc = readline.question("Enter New Description:");

    checkID.Title = newTitle || checkID.Title;
    checkID.Description = newDesc || checkID.Description;

    let convertBack = JSON.stringify(convertDB);

    await fs.writeFile("db.json", convertBack);

    console.log("Task edited succesfully.");
  } else {
    console.log("Invalid ID!!");
  }
}

export { register, login, addTask, editTask };
