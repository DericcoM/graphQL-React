import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import AppRouter from './app/Router';
import './styles/main.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById('root')
);
