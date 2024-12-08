import readline from "readline-sync";
import { registerUser, loginUser, addTask, editTask } from "./users.js";

async function main() {
  let loggedInUser = null;
  while (true) {
    console.clear();
    console.log("----------");
    console.log("  To-do");
    console.log("----------");
    const options = [
      "Exit",
      "Register",
      "Login",
      "Add Task",
      "Edit Task",
      "Delete Task",
      "Delete User",
    ];
    options.map((x, y) => console.log(`${y}. ${x}`));
    let userInput = readline.questionInt("Select your option: ");
    switch (userInput) {
      case 0:
        console.log("Exiting.... bye!");
        process.exit(0);
      case 1:
        // console.log("Register");
        await registerUser();
        break;
      case 2:
        // console.log("Login");
        loggedInUser = await loginUser();
        // console.log("Logged-in user:", loggedInUser);
        break;
      case 3:
        // console.log("Add Task");
        await addTask(loggedInUser);
        break;
      case 4:
        // console.log("Edit Task");
        await editTask(loggedInUser);
        break;
      case 5:
        console.log("Delete Task");
        break;
      case 6:
        console.log("Delete User");
        break;
      default:
        console.log("Invalid option... Try Again");
        break;
    }
    readline.question("Press Enter to continue...");
  }
}
main();
