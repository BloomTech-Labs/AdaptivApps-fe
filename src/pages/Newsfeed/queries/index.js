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

// Get a newsfeed post's comments
export const GET_NEWSFEED_COMMENTS = gql`
  query getComments($id: ID!) {
    feedComments(where: { feed: { id: $id } }) {
      id
      body
      postedBy {
        id
        userName
        firstName
        lastName
      }
    }
  }
`;

// Create a Newsfeed Comment
export const CREATE_NEWSFEED_COMMENT = gql`
  mutation createFeedComment($body: String!, $email: String!, $id: ID!) {
    createFeedComment(
      data: {
        body: $body
        postedBy: { connect: { email: $email } }
        feed: { connect: { id: $id } }
      }
    ) {
      id
      body
    }
  }
`;

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
