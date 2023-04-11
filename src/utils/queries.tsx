import { gql } from '@apollo/client';

export const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      title
      status
    }
  }
`;