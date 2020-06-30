import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
  query getUserProfile($userName: String!) {
    profile(where: { userName: $userName }) {
      id
      type
      private
      firstName
      lastName
      email
      userName
      twitter
      facebook
      instagram
      profilePicture
      profileBanner
      bio
      city
      state
      extProfile {
        id
        private
        website
        orgName
        gender
      }
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query getUserProfile($email: String!) {
    profile(where: { email: $email }) {
      id
      userName
    }
  }
`;

export const GET_PROFILE_IMAGES = gql`
  query GetProfileImages($userName: String!) {
    profile(where: { userName: $userName }) {
      id
      email
      userName
      profilePicture
      profileBanner
    }
  }
`;

export const UPDATE_PROFILE_PICTURE = gql`
  mutation UpdateProfile($userName: String!, $profilePicture: String!) {
    updateProfile(
      where: { userName: $userName }
      data: { profilePicture: $profilePicture }
    ) {
      id
      email
      profilePicture
    }
  }
`;

export const UPDATE_PROFILE_BANNER = gql`
  mutation UpdateProfile($userName: String, $profileBanner: String) {
    updateProfile(
      where: { userName: $userName }
      data: { profileBanner: $profileBanner }
    ) {
      id
      email
      profileBanner
    }
  }
`;

export const GET_UPCOMING_EVENTS = gql`
  query getUpcomingEvents($userName: String!) {
    events(
      where: { attendees_some: { eventProfile: { userName: $userName } } }
      orderBy: startDate_ASC
    ) {
      id
      title
      startDate
      endDate
      location
      imgUrl
    }
  }
`;
