import gql from "graphql-tag";

// Get Newsfeed Comments
export const GET_NEWSFEED_COMMENTS = gql`
  query getComments($id: ID!) {
    feedComments(where: { feed: { id: $id } }) {
      id
      body
      postedBy {
        id
        type
        userName
        firstName
        lastName
        email
        profilePicture
        extProfile{
          id
          orgName
        }
      }
      createdAt
      updatedAt
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
      feed {
        id
      }
      postedBy {
        id
        userName
        firstName
        lastName
        email
        profilePicture
      }
      createdAt
    }
  }
`;

// Update Newsfeed Comment
export const UPDATE_NEWSFEED_COMMENT = gql`
  mutation updateFeedComent($body: String!, $commentID: ID!) {
    updateFeedComment(data: { body: $body }, where: { id: $commentID }) {
      id
      body
      feed {
        id
      }
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

// Delete Newsfeed Comment
export const DELETE_COMMENT = gql`
  mutation deleteFeedComment($id: ID!) {
    deleteFeedComment(where: { id: $id }) {
      id
      postedBy {
        userName
        firstName
        lastName
        email
        profilePicture
      }
    }
  }
`;

// Newsfeed Comment Subscription
export const NEWSFEED_COMMENT_SUBSCRIPTION = gql`
  subscription {
    feedComment {
      mutation
      node {
        id
        body
        feed {
          id
        }
        postedBy {
          id
          userName
          firstName
          lastName
          email
          profilePicture
        }
        createdAt
        updatedAt
      }
    }
  }
`;
