import defaultPlugin from "store/plugins/defaults";
import dump from "store/plugins/dump";
import events from "store/plugins/events";
import expire from "store/plugins/expire";
import json2 from "store/plugins/json2";
import observe from "store/plugins/observe";
import operations from "store/plugins/operations";
import update from "store/plugins/update";
import engine from "store/src/store-engine";
import cookieStorage from "store/storages/cookieStorage";
import localStorage from "store/storages/localStorage";
import memoryStorage from "store/storages/memoryStorage";

import { ACCESS_KEY } from "../constants/storageKeys";
import { isTokenValid } from "./timeUtils";

const allStorages = [localStorage, cookieStorage, memoryStorage];

const plugins = [
  defaultPlugin,
  dump,
  events,
  observe,
  expire,
  json2,
  operations,
  update,
];

const ttStore = engine.createStore(allStorages, plugins);

export const setStorageItem = (key, val) => {
  ttStore.set(key, val);
};

export const getStorageItem = (key) => ttStore.get(key, null);

export const removeStorageItem = (key) => {
  ttStore.remove(key);
};

export const clearUserStorageItems = () => {
  ttStore.each((val, key) => {
    removeStorageItem(key);
  });
};

export const getToken = () => getStorageItem(ACCESS_KEY);

export const isValidSession = () => {
  const storedToken = getToken();
  return !!storedToken && isTokenValid(storedToken);
};

export default ttStore;
