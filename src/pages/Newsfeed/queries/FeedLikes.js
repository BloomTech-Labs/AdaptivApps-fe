import gql from "graphql-tag";

export const CREATE_NEWSFEED_LIKE = gql `
  mutation createFeedLike($postID: ID!, $likedBy: String!) {
    createFeedLike(data: {
      post: {
        connect: {
          id: $postID
        }}
      likedBy: {
        connect: {
          email: $likedBy
        }
      }
    }) {
      id
      post {
        id
      }
      likedBy {
        id
        email
      }
    }
  }
`

export const DELETE_NEWSFEED_LIKE = gql `
  mutation deleteFeedLike($id: ID!) {
    deleteFeedLike(where: {
      id: $id
    }) {
      id
    }
  }
`