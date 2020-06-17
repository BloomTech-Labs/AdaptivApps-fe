import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
  query getUserProfile($userName: String!) {
    profile(where: { userName: $userName }) {
      id
      firstName
      lastName
      email
      userName
      profilePicture
      profileBanner
      private
      extProfile {
        id
        private
        website
        orgName
        gender
        disability {
          id
          private
          physicalDisability
          detailedDisabilities
        }
      }
      demographicProfile {
        id
        private
        veteranStatus
        militaryBranch
        sportsParticipation {
          id
          airRifle
          alpineSkiing
          archery
          badminton
          baseball
          biathlon
          blindHockey
          boccia
          bowling
          boxing
          canoe
          cheerleading
          crossFit
          crossCountrySkiing
          curling
          cycling
          equestrian
          esports
          fishing
          goalball
          golf
          hiking
          hunting
          judo
          juJitsu
          lacrosse
          mixedMartialArts
          motorsportsMotorcross
          mountainBiking
          powerlifting
          rafting
          rockClimbing
          rowing
          sailing
          scuba
          shooting
          skateboarding
          snowboarding
          sledHockey
          soccerBlindSoccerFiveaside
          soccerAmputeeCrutchSoccer
          soccerPowerSoccer
          soccerCPSevenaside
          standupWheelchairPaddling
          swimming
          surfing
          tableTennis
          taekwondo
          taiChi
          trackField
          triathlon
          volleyballBeachVolleyball
          volleyballSittingVolleyball
          waterSkiing
          wheelchairSkateboarding
          wheelchairBasketball
          wheelchairCurling
          wheelchairFencing
          wheelchairFootball
          wheelchairSoftball
          wheelchairRugby
          wheelchairTennis
          wrestling
          yoga
        }
      }
    }
  }
`;

export const GET_PROFILE_IMAGES = gql`
  query GetProfileImages($email: String!) {
    profile(where: { email: $email }) {
      id
      email
      userName
      profilePicture
      profileBanner
    }
  }
`;

export const UPDATE_PROFILE_PICTURE = gql`
  mutation UpdateProfile($email: String!, $profilePicture: String!) {
    updateProfile(
      where: { email: $email }
      data: { profilePicture: $profilePicture }
    ) {
      id
      email
      profilePicture
    }
  }
`;

export const UPDATE_PROFILE_BANNER = gql`
  mutation UpdateProfile($email: String, $profileBanner: String) {
    updateProfile(
      where: { email: $email }
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
    events(where: { attendees_some: { eventProfile: { userName: $userName } } }, orderBy: startDate_ASC) {
      id
      title
      startDate
      endDate
      location
      imgUrl
    }
  }
`;