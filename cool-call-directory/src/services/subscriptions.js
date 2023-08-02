// graphqlSubscriptions.js
import { makeGraphQLRequest } from './graphQL';

// Subscription to listen for updates on a given call
export const ON_UPDATE_CALL_SUBSCRIPTION = `
  subscription OnUpdateCall($id: ID!) {
    onUpdateCall(id: $id) {
      id
      direction
      from
      to
      # Add other call fields you want to retrieve here
      notes {
        id
        content
        created_at
        updated_at
      }
    }
  }
`;

// Wrapper function for onUpdateCall subscription
export const onUpdateCall = async (id, callback) => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    console.error('Authentication token not found.');
    return null;
  }

  const headers = {
    Authorization: `Bearer ${authToken}`,
  };

  try {
    const response = await makeGraphQLRequest(ON_UPDATE_CALL_SUBSCRIPTION, { id }, headers);

    // Handle the subscription event
    if (response?.onUpdateCall) {
      callback(response.onUpdateCall);
    }

    return response?.onUpdateCall || null;
  } catch (error) {
    console.error('GraphQL subscription failed:', error);
    return null;
  }
};
