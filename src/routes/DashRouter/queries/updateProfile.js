import gql from 'graphql-tag';

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile(
    $email: String!
    $firstName: String
    $lastName: String
    $displayName: String
    $birthday: String
    $bio: String
    $disability: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
        birthday: $birthday
        bio: $bio
        disability: $disability
      }
    ) {
      email
      firstName
      lastName
      displayName
      birthday
      bio
      disability
    }
  }
`;
