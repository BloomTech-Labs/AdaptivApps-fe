export const GET_USER_PROFILE = gql`
  query getUserProfile($userName: String!) {
    profile(where: { userName: $userName }) {
      id
      firstName
      lastName
      email
      userName
    }
  }
`;
