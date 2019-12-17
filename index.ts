const divConsole = document.getElementById("console");

function printError(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = "Error: " + message;
  div.className = "error";
  divConsole.prepend(div);
}

function printWarning(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = "Warning: " + message;
  div.className = "warning";
  divConsole.prepend(div);
}

function printMessage(message: any) {
  if (typeof message !== "string") {
    message = JSON.stringify(message, null, 2);
  }
  const div = document.createElement("div");
  div.innerText = message;
  divConsole.prepend(div);
}
