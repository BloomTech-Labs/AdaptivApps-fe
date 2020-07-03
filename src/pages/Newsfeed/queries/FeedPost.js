import gql from "graphql-tag";

// Get Newsfeed Posts
export const GET_NEWSFEED_POSTS = gql`
  query {
    feedPosts(orderBy: createdAt_DESC) {
      id
      body
      imgUrl
      createdAt
      pinnedPost
      comments {
        id
        body
        postedBy {
          id
          userName
          firstName
          lastName
          email
          profilePicture
        }
      }
      postedBy {
        id
        userName
        firstName
        lastName
        email
        profilePicture
      }
      likes {
        id
        post {
          id
        }
        likedBy {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`;

// Create a Newsfeed Post w/ image
export const CREATE_NEWSFEED_POST = gql`
  mutation createFeedPost($body: String!, $imgUrl: String, $postedBy: String!) {
    createFeedPost(
      data: {
        body: $body
        imgUrl: $imgUrl
        postedBy: { connect: { email: $postedBy } }
      }
    ) {
      id
      body
      createdAt
      pinnedPost
      postedBy {
        id
        userName
        firstName
        lastName
        email
        profilePicture
      }
    }
  }
`;

// Pin a Newsfeed Post
export const PIN_NEWSFEED_POST = gql`
  mutation pinFeedPost($id: ID!, $pinnedPost: Boolean!) {
    updateFeedPost(data: { pinnedPost: $pinnedPost }, where: { id: $id }) {
      id
    }
  }
`;

// Update Newsfeed Post
export const UPDATE_NEWSFEED_POST = gql`
  mutation updateFeedPost($body: String!, $imgUrl: String, $id: ID!) {
    updateFeedPost(data: { body: $body, imgUrl: $imgUrl }, where: { id: $id }) {
      id
      body
      imgUrl
      pinnedPost
      postedBy {
        id
        userName
        firstName
        lastName
        email
        profilePicture
      }
      updatedAt
    }
  }
`;

// Delete Newsfeed Post
export const DELETE_NEWSFEED_POST = gql`
  mutation deleteFeedPost($id: ID!) {
    deleteFeedPost(where: { id: $id }) {
      id
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
        createdAt
        pinnedPost
        postedBy {
          id
          userName
          firstName
          lastName
          email
          profilePicture
        }
        likes {
          id
          post {
            id
          }
          likedBy {
            id
            email
            firstName
            lastName
          }
        }
      }
    }
  }
`;
