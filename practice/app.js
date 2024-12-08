import readline from "readline-sync";
import { register, login, addTask, editTask } from "./users.js";
async function main() {
  let loggedInUser = null;
  while (true) {
    console.clear();
    console.log("---------------------");
    console.log("        To-do");
    console.log("---------------------");
    const options = [
      "Exit",
      "Register",
      "Login",
      "Add Task",
      "Edit Task",
      "Delete Task",
      "Delete User",
    ];

    options.forEach((x, y) => console.log(`${y}. ${x}`));

    let userInput = readline.questionInt("Select your option:");

    switch (userInput) {
      case 0:
        console.log("Exiting now....");
        process.exit(0);
      case 1:
        // console.log("Register");
        await register();
        break;
      case 2:
        // console.log("Log In");
        loggedInUser = await login();
        // console.log("Logged in user is: ", loggedInUser); debug line
        break;
      case 3:
        // console.log("Add Task");
        await addTask(loggedInUser);
        break;
      case 4:
        await editTask(loggedInUser);
        break;
      default:
        console.log("Invalid option");
        break;
    }
    readline.question("Press enter to continue..");
  }
}
main();
