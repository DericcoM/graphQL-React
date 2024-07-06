import { gql } from "@apollo/client";

export const SEARCH_REPOS = gql`
  query SearchRepos($query: String!, $after: String) {
    search(query: $query, type: REPOSITORY, first: 10, after: $after) {
      edges {
        node {
          ... on Repository {
            name
            stargazerCount
            updatedAt
            url
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_USER_REPOS = gql`
  query GetUserRepos($username: String!, $after: String) {
    user(login: $username) {
      repositories(first: 10, after: $after) {
        edges {
          node {
            name
            stargazerCount
            updatedAt
            url
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPO_DETAILS = gql`
  query getRepoDetails($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      name
      stargazerCount
      updatedAt
      owner {
        login
        avatarUrl
      }
      languages(first: 10) {
        edges {
          node {
            name
          }
        }
      }
      description
    }
  }
`;
