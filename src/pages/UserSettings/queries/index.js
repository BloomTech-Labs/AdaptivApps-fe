import gql from "graphql-tag";

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile(
    $email: String!
    $type: String
    $private: Boolean
    $firstName: String
    $lastName: String
    $userName: String
    $phoneNumber: String
    $state: String
    $city: String
    $bio: String
    $legal: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        type: $type
        private: $private
        firstName: $firstName
        lastName: $lastName
        userName: $userName
        phoneNumber: $phoneNumber
        state: $state
        city: $city
        bio: $bio
        legal: $legal
      }
    ) {
      type
      private
      firstName
      lastName
      userName
      phoneNumber
      state
      city
      bio
      legal
      createdAt
      updatedAt
    }
  }
`;

// Creating a profile
export const ADD_USER_PROFILE = gql`
  mutation createProfile($email: String!) {
    createProfile(data: { email: $email }) {
      email
    }
  }
`;

// Retrieves user profile
export const PROFILE_INFO = gql`
  query getProfile($email: String!) {
    profile(where: { email: $email }) {
      id
      email
      firstName
      lastName
      userName
      phoneNumber
      state
      city
      extProfile {
        id
        birthday
        gender
        eC1Name
        eC1Relation
        eC1Phone
        disability {
          id
          physicalDisability
        }
      }
      demographicProfile {
        id
        veteranStatus
        militaryBranch
        yearsServed
        ethnicity
      }
    }
  }
`;

// Updates Organization Profile
export const UPDATE_ORG_PROFILE = gql`
  mutation UpdateOrgProfile(
    $email: String!
    $phoneNumber: String
    $city: String
    $state: String
    $bio: String
    $userName: String
    $orgName: String
    $website: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        phoneNumber: $phoneNumber
        city: $city
        state: $state
        bio: $bio
        userName: $userName
        extProfile: { create: { orgName: $orgName, website: $website } }
      }
    ) {
      id
    }
  }
`;

// Update User Extended Profile
export const UPDATE_EXT_PROFILE = gql`
  mutation UpdateExtProfile(
    $email: String!
    $gender: String
    $birthday: String
    $eC1Name: String
    $eC1Relation: String
    $eC1Phone: String
    $physicalDisability: String
    $detailedDisabilities: String
    $mobilityStatus: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        extProfile: {
          create: {
            gender: $gender
            birthday: $birthday
            eC1Name: $eC1Name
            eC1Relation: $eC1Relation
            eC1Phone: $eC1Phone
            disability: {
              create: {
                physicalDisability: $physicalDisability
                detailedDisabilities: $detailedDisabilities
              }
            }
            mobilityStatus: $mobilityStatus
          }
        }
      }
    ) {
      id
    }
  }
`;

// Update Demographic Profile
export const UPDATE_DEMO_PROFILE = gql`
  mutation UpdateDemoProfile(
    $email: String!
    $adaptivSportsParticipation: String
    $acsParticipation: String
    $notParticipating: String
    $angelCityParticipation: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          create: {
            adaptivSportsParticipation: $adaptivSportsParticipation
            acsParticipation: $acsParticipation
            notParticipating: $notParticipating
            angelCityParticipation: $angelCityParticipation
          }
        }
      }
    ) {
      id
    }
  }
`;

// Update Sports Demo Profile
export const UPDATE_SPORTS_DEMO = gql`
  mutation UpdateSportsDemo(
    $email: String!
    $airRifle: Boolean
    $alpineSkiing: Boolean
    $archery: Boolean
    $badminton: Boolean
    $baseball: Boolean
    $beepBaseball: Boolean
    $biathlon: Boolean
    $blindHockey: Boolean
    $boccia: Boolean
    $bowling: Boolean
    $boxing: Boolean
    $canoe: Boolean
    $cheerleading: Boolean
    $crossFit: Boolean
    $crossCountrySkiing: Boolean
    $curling: Boolean
    $cycling: Boolean
    $equestrian: Boolean
    $esports: Boolean
    $fishing: Boolean
    $goalball: Boolean
    $golf: Boolean
    $hiking: Boolean
    $hunting: Boolean
    $judo: Boolean
    $juJitsu: Boolean
    $lacrosse: Boolean
    $mixedMartialArts: Boolean
    $motorsportsMotorcross: Boolean
    $mountainBiking: Boolean
    $powerlifting: Boolean
    $rafting: Boolean
    $rockClimbing: Boolean
    $rowing: Boolean
    $sailing: Boolean
    $scuba: Boolean
    $shooting: Boolean
    $skateboarding: Boolean
    $snowboarding: Boolean
    $sledHockey: Boolean
    $soccerBlindSoccerFiveaside: Boolean
    $soccerAmputeeCrutchSoccer: Boolean
    $soccerPowerSoccer: Boolean
    $soccerCPSevenaside: Boolean
    $standupWheelchairPaddling: Boolean
    $swimming: Boolean
    $surfing: Boolean
    $tableTennis: Boolean
    $taekwondo: Boolean
    $taiChi: Boolean
    $trackField: Boolean
    $triathlon: Boolean
    $volleyballBeachVolleyball: Boolean
    $volleyballSittingVolleyball: Boolean
    $waterSkiing: Boolean
    $wheelchairSkateboarding: Boolean
    $wheelchairBasketball: Boolean
    $wheelchairCurling: Boolean
    $wheelchairFencing: Boolean
    $wheelchairFootball: Boolean
    $wheelchairSoftball: Boolean
    $wheelchairRugby: Boolean
    $wheelchairTennis: Boolean
    $wrestling: Boolean
    $yoga: Boolean
    $other: Boolean
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          update: {
            sportsParticipation: {
              create: {
                alpineSkiing: $alpineSkiing
                airRifle: $airRifle
                archery: $archery
                badminton: $badminton
                baseball: $baseball
                beepBaseball: $beepBaseball
                biathlon: $biathlon
                blindHockey: $blindHockey
                boccia: $boccia
                bowling: $bowling
                boxing: $boxing
                canoe: $canoe
                cheerleading: $cheerleading
                crossFit: $crossFit
                crossCountrySkiing: $crossCountrySkiing
                curling: $curling
                cycling: $cycling
                equestrian: $equestrian
                esports: $esports
                fishing: $fishing
                goalball: $goalball
                golf: $golf
                hiking: $hiking
                hunting: $hunting
                judo: $judo
                juJitsu: $juJitsu
                lacrosse: $lacrosse
                mixedMartialArts: $mixedMartialArts
                motorsportsMotorcross: $motorsportsMotorcross
                mountainBiking: $mountainBiking
                powerlifting: $powerlifting
                rafting: $rafting
                rockClimbing: $rockClimbing
                rowing: $rowing
                sailing: $sailing
                scuba: $scuba
                shooting: $shooting
                skateboarding: $skateboarding
                snowboarding: $snowboarding
                sledHockey: $sledHockey
                soccerBlindSoccerFiveaside: $soccerBlindSoccerFiveaside
                soccerAmputeeCrutchSoccer: $soccerAmputeeCrutchSoccer
                soccerPowerSoccer: $soccerPowerSoccer
                soccerCPSevenaside: $soccerCPSevenaside
                standupWheelchairPaddling: $standupWheelchairPaddling
                swimming: $swimming
                surfing: $surfing
                tableTennis: $tableTennis
                taekwondo: $taekwondo
                taiChi: $taiChi
                trackField: $trackField
                triathlon: $triathlon
                volleyballBeachVolleyball: $volleyballBeachVolleyball
                volleyballSittingVolleyball: $volleyballSittingVolleyball
                waterSkiing: $waterSkiing
                wheelchairSkateboarding: $wheelchairSkateboarding
                wheelchairBasketball: $wheelchairBasketball
                wheelchairCurling: $wheelchairCurling
                wheelchairFencing: $wheelchairFencing
                wheelchairFootball: $wheelchairFootball
                wheelchairSoftball: $wheelchairSoftball
                wheelchairRugby: $wheelchairRugby
                wheelchairTennis: $wheelchairTennis
                wrestling: $wrestling
                yoga: $yoga
                other: $other
              }
            }
          }
        }
      }
    ) {
      id
    }
  }
`;

// Updates Demo Profile part 2
export const UPDATE_DEMO_2 = gql`
  mutation UpdateDemo2(
    $email: String!
    $veteranStatus: String
    $militaryBranch: String
    $yearsServed: String
    $ethnicity: String
    $householdIncome: String
    $employment: String
    $favProAthletes: String
    $favCelebs: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          update: {
            veteranStatus: $veteranStatus
            militaryBranch: $militaryBranch
            yearsServed: $yearsServed
            ethnicity: $ethnicity
            householdIncome: $householdIncome
            employment: $employment
            favProAthletes: $favProAthletes
            favCelebs: $favCelebs
          }
        }
      }
    ) {
      id
    }
  }
`;

// Updates Demo Profile part 3
export const UPDATE_DEMO_3 = gql`
  mutation UpdateDemo3(
    $email: String!
    $becomeAthleteMentor: String
    $athleteMentorHelp: String
    $athleteMentorSport: String
    $acsDiscovery: String
    $acsOrgSpecificDiscovery: String
    $amplaEmail: String
    $hangerClinic: String
    $challengeMagazine: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          update: {
            becomeAthleteMentor: $becomeAthleteMentor
            athleteMentorHelp: $athleteMentorHelp
            athleteMentorSport: $athleteMentorSport
            acsDiscovery: $acsDiscovery
            acsOrgSpecificDiscovery: $acsOrgSpecificDiscovery
            amplaEmail: $amplaEmail
            hangerClinic: $hangerClinic
            challengeMagazine: $challengeMagazine
          }
        }
      }
    ) {
      id
    }
  }
`;
