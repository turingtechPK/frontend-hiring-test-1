// graphqlQueries.js
import { makeGraphQLRequest } from './graphQL'; // Import the makeGraphQLRequest function from the graphql.js file
import { gql } from '@apollo/client';

// Query to fetch paginated calls
export const PAGINATED_CALLS_QUERY = `
  query PaginatedCalls($offset: Float = 0, $limit: Float = 10) {
    paginatedCalls(offset: $offset, limit: $limit) {
      nodes {
        id
        direction
        from
        to
        duration
        is_archived
        call_type
        via
        created_at
        notes {
          id
          content
        }
      }
      totalCount
      hasNextPage
    }
  }
`;

// Query to fetch a single call by ID
export const CALL_BY_ID_QUERY = `
  query Call($id: ID!) {
    call(id: $id) {
        id
        direction
        from
        to
        duration
        is_archived
        call_type
        via
        created_at
        notes {
            id
            content
        }
    }
  }
`;

// Query to fetch the currently authenticated user
export const CURRENT_USER_QUERY = `
  query Me {
    me {
      id
      username
      # Add other user fields you want to retrieve here
    }
  }
`;

export const getPaginatedCalls = async (pageNumber = 0, itemsPerPage = 10) => {
  const offset = (pageNumber) * itemsPerPage;
  const limit = itemsPerPage;

  const response = await makeGraphQLRequest(PAGINATED_CALLS_QUERY, { offset, limit });
  return response?.paginatedCalls || null;
};

// Wrapper function for call by ID query
export const getCallById = async (id) => {
  const response = await makeGraphQLRequest(CALL_BY_ID_QUERY, {id});
  return response?.call || null;
};

// Wrapper function for me query
export const getCurrentUser = async () => {
  const response = await makeGraphQLRequest(CURRENT_USER_QUERY);
  return response?.me || null;
};
