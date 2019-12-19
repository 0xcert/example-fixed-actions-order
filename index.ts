import {
  checkApprovedAssetTransfer,
  approveAssetTransfer,
  checkApprovedAssetCreation,
  approveAssetCreation,
  signOrder,
  performOrder,
  provider
} from "./src/example";
import { config } from "./src/config";

const divConsole = document.getElementById("console");
const btnApproveAssetTransfer = document.getElementById(
  "btnApproveAssetTransfer"
);
const btnApproveAssetCreation = document.getElementById(
  "btnApproveAssetCreation"
);
const btnSignOrder = document.getElementById("btnSignOrder");
const btnPerformOrder = document.getElementById("btnPerformOrder");

btnSignOrder.addEventListener("click", async () => {
  if (config.assetLedgerId === "") {
    printWarning(
      "No assetLedgerSource defined. Either deploy a new asset ledger or set asset ledger source in src/config.ts file."
    );
    return;
  }

  if (config.account1Id === "") {
    printWarning("No account1Id defined. Please set it in src/config.ts file.");
    return;
  }

  if (config.account2Id === "") {
    printWarning("No account2Id defined. Please set it in src/config.ts file.");
    return;
  }

  if (provider.accountId !== config.account1Id) {
    printWarning("Select account1 in metamask to sign this order.");
    return;
  }

  let error = null;
  await signOrder().catch(e => {
    error = e;
    printError(e);
  });

  if (!error) {
    printMessage("Order signing sucessfull: " + config.signature);
  }
});

btnPerformOrder.addEventListener("click", async () => {
  if (config.assetLedgerId === "") {
    printWarning(
      "No assetLedgerSource defined. Either deploy a new asset ledger or set asset ledger source in src/config.ts file."
    );
    return;
  }

  if (config.account2Id === "") {
    printWarning("No account2Id defined. Please set it in src/config.ts file.");
    return;
  }

  if (provider.accountId !== config.account2Id) {
    printWarning("Select account2 in metamask to perform this order.");
    return;
  }

  const mutation = await performOrder().catch(e => {
    printError(e);
  });

  if (mutation) {
    printMessage("Atomic order in progress: " + mutation.id);
    printMessage("This may take a while.");
    await mutation.complete();
    printMessage("Atomic order completed");
  }
});

btnApproveAssetCreation.addEventListener("click", async () => {
  if (config.assetLedgerId === "") {
    printWarning(
      "No assetLedgerSource defined. Either deploy a new asset ledger or set asset ledger source in src/config.ts file."
    );
    return;
  }

  if (config.account1Id === "") {
    printWarning("No account1Id defined. Please set it in src/config.ts file.");
    return;
  }

  const isApproved = await checkApprovedAssetCreation().catch(e => {
    printError(e);
    return;
  });

  if (isApproved === null) {
    printError("Error occured when retriving approved status.");
    return;
  }

  if (isApproved) {
    printMessage("Already approved.");
  } else {
    const mutation = await approveAssetCreation().catch(e => {
      printError(e);
    });
    if (mutation) {
      printMessage("Asset creation approving progress: " + mutation.id);
      printMessage("This may take a while.");
      await mutation.complete();
      printMessage("Asset creation approval completed");
    }
  }
});

btnApproveAssetTransfer.addEventListener("click", async () => {
  if (config.assetLedgerId === "") {
    printWarning(
      "No assetLedgerSource defined. Either deploy a new asset ledger or set asset ledger source in src/config.ts file."
    );
    return;
  }

  if (config.account1Id === "") {
    printWarning("No account1Id defined. Please set it in src/config.ts file.");
    return;
  }

  const isApproved = await checkApprovedAssetTransfer().catch(e => {
    printError(e);
    return;
  });

  if (isApproved === null) {
    printError("Error occured when retriving approved status.");
    return;
  }

  if (isApproved) {
    printMessage("Already approved.");
  } else {
    const mutation = await approveAssetTransfer().catch(e => {
      printError(e);
    });
    if (mutation) {
      printMessage("Asset transfer approving progress: " + mutation.id);
      printMessage("This may take a while.");
      await mutation.complete();
      printMessage("Asset transfer approval completed");
    }
  }
});

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
