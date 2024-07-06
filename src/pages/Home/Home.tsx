import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_REPOS, SEARCH_REPOS } from "../../graphql/queries";
import {
  useStore,
  setSearchQuery,
  setUsername,
  setCurrentPage,
} from "../../store";
import RepositoryList from "../../components/RepositoryList";
import Pagination from "../../components/Pagination";

const Home: React.FC = () => {
  const { searchQuery, currentPage, username } = useStore();

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    fetchMore: fetchMoreUser,
  } = useQuery(GET_USER_REPOS, {
    variables: { username, after: null },
    skip: searchQuery !== "" || username === "",
  });

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
    fetchMore: fetchMoreSearch,
  } = useQuery(SEARCH_REPOS, {
    variables: { query: searchQuery, after: null },
    skip: searchQuery === "",
  });

  const loading = searchQuery ? searchLoading : userLoading;
  const error = searchQuery ? searchError : userError;
  const data = searchQuery ? searchData : userData;
  const fetchMore = searchQuery ? fetchMoreSearch : fetchMoreUser;

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    },
    []
  );

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      setCurrentPage(1);
    },
    []
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      fetchMore({ variables: { after: data?.search?.pageInfo.endCursor } });
    },
    [fetchMore, data]
  );

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter GitHub username..."
      />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search repositories..."
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <RepositoryList
          repositories={
            searchQuery ? data.search.edges : data.user.repositories.edges
          }
        />
      )}
      <Pagination
        currentPage={currentPage}
        setPage={handlePageChange}
        hasNextPage={data?.search?.pageInfo.hasNextPage || false}
      />
    </div>
  );
};

export default Home;
