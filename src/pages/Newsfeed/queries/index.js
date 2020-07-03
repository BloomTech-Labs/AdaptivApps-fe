import gql from "graphql-tag";

// Get user profile to display profile pic
export const GET_MY_PROFILE = gql`
  query getMyProfile($email: String!) {
    profile(where: { email: $email }) {
      id
      firstName
      lastName
      userName
      email
      profilePicture
    }
  }
`;
