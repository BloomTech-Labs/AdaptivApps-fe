import gql from "graphql-tag";

export const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;