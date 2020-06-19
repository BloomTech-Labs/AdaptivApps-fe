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
`