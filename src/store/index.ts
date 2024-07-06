import { createEvent, createStore } from "effector";

export const setSearchQuery = createEvent<string>();
export const setCurrentPage = createEvent<number>();
export const setUsername = createEvent<string>();

export const $searchQuery = createStore<string>("").on(
  setSearchQuery,
  (_, query) => query
);

export const $currentPage = createStore<number>(1).on(
  setCurrentPage,
  (_, page) => page
);

export const $username = createStore<string>("DericcoM").on(
  setUsername,
  (_, name) => name
);

export const useStore = () => {
  return {
    searchQuery: $searchQuery.getState(),
    setSearchQuery,
    currentPage: $currentPage.getState(),
    setCurrentPage,
    username: $username.getState(),
    setUsername,
  };
};
