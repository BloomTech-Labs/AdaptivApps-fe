import gql from "graphql-tag";
// Retrieves user profile type
export const PROFILE_TYPE = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      type
      extProfile {
        id
        roleIdentity
      }
    }
  }
`;
// Updates type and roleIdentity in user profile. Used in Account Type.js of Profile Wizard
export const UPDATE_TYPE_ROLE = gql`
  mutation UpdateTypeRole(
    $email: String!
    $type: String
    $roleIdentity: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        type: $type
        extProfile: {
          upsert: {
            update: { roleIdentity: $roleIdentity }
            create: { roleIdentity: $roleIdentity }
          }
        }
      }
    ) {
      id
      type
      extProfile {
        id
        roleIdentity
      }
    }
  }
`;

// Updates user profile used in Step 1 of Profile Wizard
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile(
    $email: String!
    $private: Boolean
    $firstName: String
    $lastName: String
    $userName: String
    $phoneNumber: String
    $instagram: String
    $facebook: String
    $twitter: String
    $bio: String
    $legal: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        private: $private
        firstName: $firstName
        lastName: $lastName
        userName: $userName
        phoneNumber: $phoneNumber
        instagram: $instagram
        facebook: $facebook
        twitter: $twitter
        bio: $bio
        legal: $legal
      }
    ) {
      id
      private
      firstName
      lastName
      userName
      phoneNumber
      twitter
      facebook
      instagram
      bio
      legal
      createdAt
      updatedAt
    }
  }
`;
// retrieves user profile to set default values in Step 1 of Profile Wizard
export const PROFILE_STEP_1 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      firstName
      lastName
      userName
      phoneNumber
      twitter
      facebook
      instagram
      bio
      legal
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
      type
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
        orgName
        website
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
    $instagram: String
    $facebook: String
    $twitter: String
    $bio: String
    $userName: String
    $orgName: String
    $website: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        phoneNumber: $phoneNumber
        instagram: $instagram
        facebook: $facebook
        twitter: $twitter
        bio: $bio
        userName: $userName
        extProfile: {
          upsert: {
            update: { orgName: $orgName, website: $website }
            create: { orgName: $orgName, website: $website }
          }
        }
      }
    ) {
      id
      phoneNumber
      instagram
      facebook
      twitter
      userName
      extProfile {
        id
        orgName
        website
      }
    }
  }
`;
// retrieves organization profile to set default values in org form of Profile Wizard
export const ORG_PROFILE = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      phoneNumber
      userName
      instagram
      facebook
      twitter
      bio
      extProfile {
        id
        orgName
        website
      }
    }
  }
`;

// Update User Extended Profile used in Step 2 of Profile Wizard
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
    $tShirtSize: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        extProfile: {
          upsert: {
            update: {
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
              tShirtSize: $tShirtSize
            }
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
              tShirtSize: $tShirtSize
            }
          }
        }
      }
    ) {
      id
      extProfile {
        id
        website
        disability {
          id
        }
      }
    }
  }
`;

// retrieves user profile to set default values in Step 2 of Profile Wizard
export const PROFILE_STEP_2 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      extProfile {
        id
        gender
        birthday
        eC1Name
        eC1Relation
        eC1Phone
        disability {
          id
          physicalDisability
          detailedDisabilities
        }
        mobilityStatus
        tShirtSize
      }
    }
  }
`;

// Update Demographic Profile used in step 3 of Profile Wizard
export const UPDATE_DEMO_PROFILE = gql`
  mutation UpdateDemoProfile(
    $email: String!
    $veteranStatus: String
    $militaryBranch: String
    $yearsServed: String
    $ethnicity: String
    $householdIncome: String
    $employment: String
    $covid: String
    $citizen: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          upsert: {
            update: {
              veteranStatus: $veteranStatus
              militaryBranch: $militaryBranch
              yearsServed: $yearsServed
              ethnicity: $ethnicity
              householdIncome: $householdIncome
              employment: $employment
              covid: $covid
              citizen: $citizen
            }
            create: {
              veteranStatus: $veteranStatus
              militaryBranch: $militaryBranch
              yearsServed: $yearsServed
              ethnicity: $ethnicity
              householdIncome: $householdIncome
              employment: $employment
              covid: $covid
              citizen: $citizen
            }
          }
        }
      }
    ) {
      id
      demographicProfile {
        id
        veteranStatus
        militaryBranch
        yearsServed
        ethnicity
        householdIncome
        employment
        covid
        citizen
      }
    }
  }
`;
// Retrieves user profile info to set default values in Step 3 of Profile Wizard
export const PROFILE_STEP_3 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      demographicProfile {
        id
        veteranStatus
        militaryBranch
        yearsServed
        ethnicity
        householdIncome
        employment
        covid
        citizen
      }
    }
  }
`;

/// Updates Demo Profile part 2 used in step 4 of Profile Wizard
export const UPDATE_DEMO_2 = gql`
  mutation UpdateDemo2(
    $email: String!
    $favProAthletes: String
    $favCelebs: String
    $goals: String
    $specialTalents: String
    $adaptivSportsParticipation: String
    $notParticipating: String
    $sportEquipmentNeed: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          update: {
            favProAthletes: $favProAthletes
            favCelebs: $favCelebs
            goals: $goals
            specialTalents: $specialTalents
            adaptivSportsParticipation: $adaptivSportsParticipation
            notParticipating: $notParticipating
            sportEquipmentNeed: $sportEquipmentNeed
          }
        }
      }
    ) {
      id
      demographicProfile {
        id
        favProAthletes
        favCelebs
        goals
        specialTalents
        adaptivSportsParticipation
        notParticipating
        sportEquipmentNeed
      }
    }
  }
`;
// Retrieves profile data to be used in Step4.js
export const PROFILE_STEP_4 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      demographicProfile {
        id
        favProAthletes
        favCelebs
        goals
        specialTalents
        adaptivSportsParticipation
        notParticipating
        sportEquipmentNeed
      }
    }
  }
`;

// Updates Demo Profile part 3 used in step 5 of Profile Wizard
export const UPDATE_DEMO_3 = gql`
  mutation UpdateDemo3(
    $email: String!
    $acsDiscovery: String
    $acsOrgSpecificDiscovery: String
    $acsParticipation: String
    $amplaEmail: String
    $virtualRide: String
    $virtualRidePlatforms: String
    $xBoxGamePass: String
    $videoGameFamiliarity: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          update: {
            acsDiscovery: $acsDiscovery
            acsOrgSpecificDiscovery: $acsOrgSpecificDiscovery
            acsParticipation: $acsParticipation
            amplaEmail: $amplaEmail
            virtualRide: $virtualRide
            virtualRidePlatforms: $virtualRidePlatforms
            xBoxGamePass: $xBoxGamePass
            videoGameFamiliarity: $videoGameFamiliarity
          }
        }
      }
    ) {
      id
      demographicProfile {
        id
        acsDiscovery
        acsOrgSpecificDiscovery
        acsParticipation
        amplaEmail
        virtualRide
        virtualRidePlatforms
        xBoxGamePass
        videoGameFamiliarity
      }
    }
  }
`;
// Retrieves user profile info to set default values in Step 5 of Profile Wizard
export const PROFILE_STEP_5 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      demographicProfile {
        id
        acsDiscovery
        acsOrgSpecificDiscovery
        acsParticipation
        amplaEmail
        virtualRide
        virtualRidePlatforms
        xBoxGamePass
        videoGameFamiliarity
      }
    }
  }
`;

// Updates Demo Profile part 4 used in Step 6 of Profile Wizard
export const UPDATE_DEMO_4 = gql`
  mutation UpdateDemo4(
    $email: String!
    $additionalInfo: String
    $guardianSignature: String
    $waiverSignature: String
    $isMinor: Boolean
    $minorName: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          update: {
            additionalInfo: $additionalInfo
            guardianSignature: $guardianSignature
            waiverSignature: $waiverSignature
            isMinor: $isMinor
            minorName: $minorName
          }
        }
      }
    ) {
      id
      demographicProfile {
        id
        additionalInfo
        guardianSignature
        waiverSignature
        isMinor
        minorName
      }
    }
  }
`;

// Retrieves user profile info to set default values in Step 6 of Profile Wizard
export const PROFILE_STEP_6 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      demographicProfile {
        id
        additionalInfo
        guardianSignature
        waiverSignature
        isMinor
        minorName
      }
    }
  }
`;
