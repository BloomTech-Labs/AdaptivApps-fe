import gql from "graphql-tag";

// Get Newsfeed Posts
export const GET_NEWSFEED_POSTS = gql`
  query {
    feedPosts(orderBy: createdAt_DESC) {
      id
      body
      imgUrl
      createdAt
      comments {
        id
        body
        postedBy {
          id
          userName
          firstName
          lastName
          email
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

// Create a Newsfeed Post w/ no image
export const CREATE_NEWSFEED_POST_NO_IMAGE = gql`
  mutation createFeedPost($body: String!, $postedBy: String!) {
    createFeedPost(
      data: { body: $body, postedBy: { connect: { email: $postedBy } } }
    ) {
      id
      body
      createdAt
      postedBy {
        id
        email
      }
    }
  }
`;

// Create a Newsfeed Post w/ image
export const CREATE_NEWSFEED_POST_WITH_IMAGE = gql`
  mutation createFeedPost(
    $body: String!
    $imgUrl: String!
    $postedBy: String!
  ) {
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
      postedBy {
        id
        email
      }
    }
  }
`;

// Update Newsfeed Post w/ no image
export const UPDATE_NEWSFEED_POST_NO_IMAGE = gql`
  mutation updateFeedPost($body: String!, $id: ID!) {
    updateFeedPost(data: { body: $body }, where: { id: $id }) {
      id
      body
      imgUrl
      postedBy {
        id
        email
      }
      updatedAt
    }
  }
`;

// Update Newsfeed Post w/ image
export const UPDATE_NEWSFEED_POST_WITH_IMAGE = gql`
  mutation updateFeedPost($body: String!, $imgUrl: String!, $id: ID!) {
    updateFeedPost(data: { body: $body, imgUrl: $imgUrl }, where: { id: $id }) {
      id
      body
      imgUrl
      postedBy {
        id
        email
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
