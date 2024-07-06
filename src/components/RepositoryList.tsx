import React from "react";
import { Link } from "react-router-dom";

interface Repository {
  node: {
    name: string;
    stargazerCount: number;
    updatedAt: string;
    url: string;
  };
}

interface RepositoryListProps {
  repositories: Repository[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <ul>
      {repositories.map((repo, index) => (
        <li key={index}>
          <Link to={`/repository/${repo.node.name}`}>{repo.node.name}</Link> -{" "}
          {repo.node.stargazerCount} stars - Last updated:{" "}
          {new Date(repo.node.updatedAt).toLocaleDateString()} -{" "}
          <a href={repo.node.url}>Github</a>
        </li>
      ))}
    </ul>
  );
};

export default RepositoryList;
