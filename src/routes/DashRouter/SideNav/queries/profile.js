import gql from "graphql-tag";

export const GET_MY_PROFILE = gql `
    query getMyProfile($email: String!) {
        profile(where: {email: $email}) {
            id
            firstName
            lastName
            type
            extProfile {
                orgName
            }
    }
  }
  `;