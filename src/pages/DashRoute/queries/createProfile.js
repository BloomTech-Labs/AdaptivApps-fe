import gql from 'graphql-tag';

// Creating a profile, being used in UserDashboard
export const ADD_USER_PROFILE = gql`
  mutation createProfile($email: String!) {
    createProfile(data: { email: $email }) {
      email
    }
  }
`;
