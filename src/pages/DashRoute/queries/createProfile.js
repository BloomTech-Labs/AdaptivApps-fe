import gql from 'graphql-tag';

export const ADD_USER_PROFILE = gql`
  mutation createProfile($email: String!) {
    createProfile(email: $email) {
      email
    }
  }
`;
