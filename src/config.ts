import {
  OrderKind,
  ActionsOrderActionKind,
  FixedActionsOrder
} from "@0xcert/ethereum-gateway";

export const config = {
  providerConfig: {
    requiredConfirmations: 1,
    // ropsten config
    gatewayConfig: {
      actionsOrderId: "0x6Cb40DB529637C218824a2660EFC7CbaD5485115",
      assetLedgerDeployOrderId: "0x9de066264347165693eC890ccC1C8Af8f9A15f51",
      valueLedgerDeployOrderId: "0x327577e70e21AcEe01447AD06939Fb4057232b2A"
    }
  },
  assetLedgerId: "", // Input you own asset ledger id
  account1Id: "", // Input your primary metamask account Id.
  account2Id: "", // Input your secondary metamask account Id
  signature: ""
};

export const order = {
  kind: OrderKind.FIXED_ACTIONS_ORDER,
  signers: [config.account1Id, config.account2Id],
  seed: Date.now(),
  expiration: Date.now() + 86400000,
  actions: [
    {
      kind: ActionsOrderActionKind.TRANSFER_ASSET,
      ledgerId: config.assetLedgerId,
      senderId: config.account1Id,
      receiverId: config.account2Id,
      assetId: "100"
    },
    {
      kind: ActionsOrderActionKind.CREATE_ASSET,
      ledgerId: config.assetLedgerId,
      senderId: config.account1Id,
      receiverId: config.account2Id,
      assetId: "101",
      assetImprint:
        "c6c14772f269bed1161d4350403f4c867c749b3cce7abe84c6d0605068cd8a87"
    }
  ]
} as FixedActionsOrder;
