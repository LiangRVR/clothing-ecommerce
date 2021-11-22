import { takeLatest, call, put } from "redux-saga/effects";
import { ShopActionTypes } from "./shop.types";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";
import {
  collectionRef,
  convertCollectionSnapShotToMap,
} from "../../firebase/firebase.utils";
import { getDocs } from "firebase/firestore";

export function* fetchCollectionsAsync() {
  try {
    const collectionsRef = yield call(collectionRef, "collections");
    const getCollectionsData = yield call(getDocs, collectionsRef);
    const collectionsMap = yield call(
      convertCollectionSnapShotToMap,
      getCollectionsData
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
