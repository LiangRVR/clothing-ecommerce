import { ShopActionTipes } from "./shop.types";

export const updateCollections = (collectionMap) => ({
  type: ShopActionTipes.UPDATE_COLLECTIONS,
  payload: collectionMap,
});
