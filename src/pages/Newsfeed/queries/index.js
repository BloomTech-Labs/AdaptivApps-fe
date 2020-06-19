import gql from "graphql-tag";

// Get Newsfeed Posts
export const GET_NEWSFEED_POSTS = gql`
  query {
    feedPosts {
      id
      body
      imgUrl
      comments {
        id
        body
        postedBy {
          id
          userName
          firstName
          lastName
        }
    }
      postedBy {
        id
        userName
        firstName
        lastName
      }
      createdAt
    }
  }
`;

// Newsfeed Post Subscription
export const NEWSFEED_POST_SUBSCRIPTION = gql`
  subscription {
  feedPost {
    mutation
    node {
      id
      body
      imgUrl
      postedBy {
        id
        userName
        firstName
        lastName
      }
      createdAt
    }
  }
}
`;