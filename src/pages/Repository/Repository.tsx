import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_REPO_DETAILS } from '../../graphql/queries';
import { useStore } from '../../store';

interface RepositoryOwner {
  login: string;
  avatarUrl: string;
}

interface LanguageEdge {
  node: {
    name: string;
  };
}

interface RepositoryDetails {
  name: string;
  stargazerCount: number;
  updatedAt: string;
  owner: RepositoryOwner;
  languages: {
    edges: LanguageEdge[];
  };
  description: string;
}

interface RepositoryData {
  repository: RepositoryDetails;
}

interface RepositoryVars {
  name: string;
  owner: string;
}

const Repository: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { username } = useStore();

  const { data, loading, error } = useQuery<RepositoryData, RepositoryVars>(GET_REPO_DETAILS, {
    variables: { name: name || '', owner: username },
    skip: !name,
  });

  if (!name) {
    return <p>Error: Repository name is required.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { repository } = data!;

  return (
    <div>
      <h1>{repository.name} - {repository.stargazerCount} stars - Last updated: {new Date(repository.updatedAt).toLocaleDateString()}</h1>
      <img src={repository.owner.avatarUrl} alt={repository.owner.login} />
      <p>Owner: <a href={`https://github.com/${repository.owner.login}`}>{repository.owner.login}</a></p>
      <p>Languages: {repository.languages.edges.map((lang) => lang.node.name).join(', ')}</p>
      <p>{repository.description}</p>
    </div>
  );
};

export default Repository;
