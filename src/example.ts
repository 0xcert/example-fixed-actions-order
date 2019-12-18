import {
  AssetLedger,
  GeneralAssetLedgerAbility
} from "@0xcert/ethereum-asset-ledger";
import { Gateway, ProxyKind } from "@0xcert/ethereum-gateway";
import { MetamaskProvider } from "@0xcert/ethereum-metamask-provider";
import { config, order } from "./config";

// We create a new instance of metamask provider.
export const provider = new MetamaskProvider(config.providerConfig);

export async function enableMetamask() {
  // We first check if metamask is already enabled.
  if (!(await provider.isEnabled())) {
    // If metamask is not enabled, we enable it.
    await provider.enable();
  }
}

export async function checkApprovedAssetTransfer() {
  await enableMetamask();
  const assetLedger = new AssetLedger(provider, config.assetLedgerId);
  const gateway = new Gateway(provider);
  const transferProxy = await gateway.getProxyAccountId(
    ProxyKind.TRANSFER_ASSET
  );
  return assetLedger.isApprovedOperator(config.account1Id, transferProxy);
}

export async function checkApprovedAssetCreation() {
  await enableMetamask();
  const assetLedger = new AssetLedger(provider, config.assetLedgerId);
  const gateway = new Gateway(provider);
  const createProxy = await gateway.getProxyAccountId(ProxyKind.CREATE_ASSET);
  const abilities = await assetLedger.getAbilities(createProxy);
  if (typeof abilities === "undefined") {
    return false;
  }
  return abilities.indexOf(GeneralAssetLedgerAbility.CREATE_ASSET) !== -1;
}

export async function approveAssetTransfer() {
  await enableMetamask();
  const assetLedger = new AssetLedger(provider, config.assetLedgerId);
  const gateway = new Gateway(provider);
  const transferProxy = await gateway.getProxyAccountId(
    ProxyKind.TRANSFER_ASSET
  );
  return assetLedger.approveOperator(transferProxy);
}

export async function approveAssetCreation() {
  await enableMetamask();
  const assetLedger = new AssetLedger(provider, config.assetLedgerId);
  const gateway = new Gateway(provider);
  const createProxy = await gateway.getProxyAccountId(ProxyKind.CREATE_ASSET);
  return assetLedger.grantAbilities(createProxy, [
    GeneralAssetLedgerAbility.CREATE_ASSET
  ]);
}

export async function signOrder() {
  await enableMetamask();
  const gateway = new Gateway(provider);
  console.log(order);
  const signature = await gateway.sign(order).catch(e => {
    console.log(e);
    throw e;
  });
  config.signature = signature;
}

export async function performOrder() {
  const gateway = new Gateway(provider);
  return gateway.perform(order, [config.signature]);
}
