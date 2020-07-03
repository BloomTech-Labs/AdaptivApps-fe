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
