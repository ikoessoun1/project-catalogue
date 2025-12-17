function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  }else {
    return "two angry bears";
  }
}

// try {
//   console.log("You see", look());
// } catch (error) {
//   console.error("Something went wrong: " + error);
// }

for(;;) {
  try {
    let dir = promptDirection("Where?");
    console.log("You chose", dir);
    break;

  } catch (e) {
    console.log("Not a valid direction. Try again. ")
  }
}

class InputError extends Error {};
