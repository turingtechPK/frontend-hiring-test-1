import { ApolloProvider } from "@apollo/client";
import apolloClient from './graphql';
import AppRoutes from './routes';

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      <ApolloProvider client={apolloClient}>
        <AppRoutes />
      </ApolloProvider>
    </div>
  );
}

export default App;
