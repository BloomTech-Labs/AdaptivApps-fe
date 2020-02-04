import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import "../App.css";

const ProfileForm = props => {
  const [userInfo, setUserInfo] = useState({
    disabilities: "",
    type: "",
    state: "",
    city: "",
    veteran: false
  });

  console.log(userInfo.disabilities);
  const handleChange = e => {
    let name = e.target.name;
    setUserInfo({ ...userInfo, [name]: e.target.value });
  };
  const handleSelect = selected => {
    setUserInfo({ ...userInfo, disabilities: selected.target.value });
  };
  const handleStateSelect = selected => {
    setUserInfo({ ...userInfo, state: selected.target.value });
  };
  const handleTypeSelect = selected => {
    setUserInfo({ ...userInfo, type: selected.target.value });
  };
  const handleImpairmentSelect = selected => {
    setUserInfo({ ...userInfo, impairment: selected.target.value });
  };
  const handleVeteran = selected => {
    setUserInfo({ ...userInfo, veteran: !userInfo.veteran });
  };
  const handleVetSelect = selected => {
    setUserInfo({ ...userInfo, vet: selected.target.value });
  };
  const handleMobilitySelect = selected => {
    setUserInfo({ ...userInfo, mobility: selected.target.value });
  };

  const handledisabilityTrueSelect = selected => {
    setUserInfo({ ...userInfo, disabilityTrue: selected.target.value });
  };

  const handleDate = date => {
    setUserInfo({ ...userInfo, birthDate: date.target.value })
  }

  const handleVolunteerTypeSelect = selected => {
    setUserInfo({ ...userInfo, volunteerType: selected.target.value });
  };

  console.log(userInfo);

  //array of disabilities for the select
  const disabilities = [
    { label: "Athetosis", value: "Athetosis" },
    { label: "Impaired Muscle Power", value: "Impaired Muscle Power" },
    {
      label: "Impaired Passive Range of Movement",
      value: "Impaired Passive Range of Movement"
    },
    { label: "Limb Deficiency", value: "Limb Deficiency" },
    { label: "Leg Length Difference", value: "Leg Length Difference" },
    { label: "Visual Impairment", value: "Vision" },
    { label: "Short Stature", value: "Short Stature" },
    { label: "Hypertonia", value: "Hypertonia" },
    { label: "Ataxia", value: "Ataxia" },
    { label: "Intellectual Impairment", value: "Intellectual Impairment" },
    { label: "None", Value: "None" }
  ];
  //array of states for the state select
  const states = [
    {
      value: "Alabama",
      label: "AL"
    },
    {
      value: "Alaska",
      label: "AK"
    },
    {
      value: "American Samoa",
      label: "AS"
    },
    {
      value: "Arizona",
      label: "AZ"
    },
    {
      value: "Arkansas",
      label: "AR"
    },
    {
      value: "California",
      label: "CA"
    },
    {
      value: "Colorado",
      label: "CO"
    },
    {
      value: "Connecticut",
      label: "CT"
    },
    {
      value: "Delaware",
      label: "DE"
    },
    {
      value: "District Of Columbia",
      label: "DC"
    },
    {
      value: "Federated States Of Micronesia",
      label: "FM"
    },
    {
      value: "Florida",
      label: "FL"
    },
    {
      value: "Georgia",
      label: "GA"
    },
    {
      value: "Guam",
      label: "GU"
    },
    {
      value: "Hawaii",
      label: "HI"
    },
    {
      value: "Idaho",
      label: "ID"
    },
    {
      value: "Illinois",
      label: "IL"
    },
    {
      value: "Indiana",
      label: "IN"
    },
    {
      value: "Iowa",
      label: "IA"
    },
    {
      value: "Kansas",
      label: "KS"
    },
    {
      value: "Kentucky",
      label: "KY"
    },
    {
      value: "Louisiana",
      label: "LA"
    },
    {
      value: "Maine",
      label: "ME"
    },
    {
      value: "Marshall Islands",
      label: "MH"
    },
    {
      value: "Maryland",
      label: "MD"
    },
    {
      value: "Massachusetts",
      label: "MA"
    },
    {
      value: "Michigan",
      label: "MI"
    },
    {
      value: "Minnesota",
      label: "MN"
    },
    {
      value: "Mississippi",
      label: "MS"
    },
    {
      value: "Missouri",
      label: "MO"
    },
    {
      value: "Montana",
      label: "MT"
    },
    {
      value: "Nebraska",
      label: "NE"
    },
    {
      value: "Nevada",
      label: "NV"
    },
    {
      value: "New Hampshire",
      label: "NH"
    },
    {
      value: "New Jersey",
      label: "NJ"
    },
    {
      value: "New Mexico",
      label: "NM"
    },
    {
      value: "New York",
      label: "NY"
    },
    {
      value: "North Carolina",
      label: "NC"
    },
    {
      value: "North Dakota",
      label: "ND"
    },
    {
      value: "Northern Mariana Islands",
      label: "MP"
    },
    {
      value: "Ohio",
      label: "OH"
    },
    {
      value: "Oklahoma",
      label: "OK"
    },
    {
      value: "Oregon",
      label: "OR"
    },
    {
      value: "Palau",
      label: "PW"
    },
    {
      value: "Pennsylvania",
      label: "PA"
    },
    {
      value: "Puerto Rico",
      label: "PR"
    },
    {
      value: "Rhode Island",
      label: "RI"
    },
    {
      value: "South Carolina",
      label: "SC"
    },
    {
      value: "South Dakota",
      label: "SD"
    },
    {
      value: "Tennessee",
      label: "TN"
    },
    {
      value: "Texas",
      label: "TX"
    },
    {
      value: "Utah",
      label: "UT"
    },
    {
      value: "Vermont",
      label: "VT"
    },
    {
      value: "Virgin Islands",
      label: "VI"
    },
    {
      value: "Virginia",
      label: "VA"
    },
    {
      value: "Washington",
      label: "WA"
    },
    {
      value: "West Virginia",
      label: "WV"
    },
    {
      value: "Wisconsin",
      label: "WI"
    },
    {
      value: "Wyoming",
      label: "WY"
    }
  ];
  //array of user types
  const userType = [
    { label: "Coach", value: "Coach" },
    { label: "Athlete", value: "Athlete" },
    { label: "Volunteer", value: "Volunteer" }
  ];
  //array of specific impairments
  const impairment = [
    { label: "ALS", value: "ALS" },
    {
      label: "Amputation / Limb Difference",
      value: "Amputation / Limb Difference"
    },
    { label: "Arthrogryposis", value: "Arthrogryposis" },
    { label: "Ataxia", value: "Ataxia" },
    { label: "Blind / Visual Impairment", value: "Blind / Visual Impairment" },
    { label: "Brachial Plexus Injury", value: "Brachial Plexus Injury" },
    { label: "Cauda Equina syndrome", value: "Cauda Equina syndrome" },
    { label: " Cerebal Palsy", value: " Cerebal Palsy" },
    {
      label: "Chronic joint immobilization / Arthritis",
      value: "Chronic joint immobilization / Arthritis"
    },
    {
      label: "CMT - Charcot - Maire - Tooth",
      value: "CMT - Charcot - Maire - Tooth"
    },
    { label: "Drop Foot", value: "Drop Foot" },
    { label: "Dwarfism", value: "Dwarfism" },
    { label: " Ehlers Danos Syndrom", value: " Ehlers Danos Syndrom" },
    { label: "Fibromyalgia", value: "Fibromyalgia" },
    { label: "Guillain–Barré syndrome", value: "Guillain–Barré syndrome" },
    { label: "Leg Length Difference", value: "Leg Length Difference" },
    { label: "Multiple Sclerosis", value: "Multiple Sclerosis" },
    { label: "Muscular Dystrophy", value: "Muscular Dystrophy" },
    { label: "Osteogenesis imperfecta", value: "Osteogenesis imperfecta" },
    { label: "Osteoporosis", value: "Osteoporosis" },
    { label: "Parkinsons", value: "Parkinsons" },
    { label: "Polio", value: "Polio" },
    {
      label: "Prader - Willi Syndrome(PWS)",
      value: "Prader - Willi Syndrome(PWS)"
    },
    { label: "Short Stature", value: "Short Stature" },
    { label: "Spina Bifida", value: "Spina Bifida" },
    {
      label: "Spinal Cord Injury - Paraplegia",
      value: "Spinal Cord Injury - Paraplegia"
    },
    {
      label: "Spinal Cord Injury - Quadraplegia",
      value: "Spinal Cord Injury - Quadraplegia"
    },
    { label: "Stroke", value: "Stroke" },
    { label: "TBI", value: "TBI" },
    { label: "Other", value: "Other" }
  ];

  const vet = [
    { label: "Army", value: "Army" },
    { label: "Navy", value: "Navy" },
    { label: "Air Force", value: "Air Force" },
    { label: "Marine Corps", value: "Marine Corps" },
    { label: "Coast Guard", value: "Coast Guard" },
    { label: "Foreign Military", value: "Foreign Military" },
    { label: "Other", value: "Other" }
  ];

  const mobility = [
    { value: "Walk Independently", label: "Walk Independently" },
    { value: "Walk with assistive device", label: "Walk with assistive device" },
    { value: "Manual Wheelchair", label: "Manual Wheelchair" },
    { value: "Power Chair", label: "Power Chair" }
  ]

  const VolunteerType = [
    { value: "Volunteer at the annual Angel City Games", label: "Volunteer at the annual Angel City Games" },
    { value: "Serve on the Angel City Sports Volunteer Committee", label: "Serve on the Angel City Sports Volunteer Committee" },
    { value: "Serve on the ACG Leadership Committee", label: "Serve on the ACG Leadership Committee" },
    { value: "Volunteer at our fundraisng events", label: "Volunteer at our fundraisng events" },
    { value: "Volunteer at our sport clinics", label: "Volunteer at our sport clinics" },
    { value: "Volunteer at our outreach events", label: "Volunteer at our outreach events" },
  ]

  const disabilityTrue = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
    { value: "Prefer not to say", label: "Prefer not to say" }
  ]


  return (
    <form>
      {/* <div>
        <TextField
          id="select-user-type"
          select
          label="User-Type"
          value={userInfo.type}
          onChange={handleTypeSelect}
          helperText="Please select what State you're from."
        >
          {userType.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div> */}
      {/* made it so certain things only display depending on the user type */}
      <div className={userInfo.type == "Athlete" ? "athlete" : "none"}>
        <div>
          <TextField
            id="select-state"
            select
            label="State"
            value={userInfo.state}
            onChange={handleStateSelect}
            helperText="Please select your State"
          >
            {states.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="Select Disability Group"
            select
            label="Disability Group"
            value={userInfo.disabilities}
            onChange={handleSelect}
            helperText="Please select your Disability."
          >
            {disabilities.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="Select Specific Disability"
            select
            label="Specific Disability"
            value={userInfo.impairment}
            onChange={handleImpairmentSelect}
            helperText="Please select your Disability."
          >
            {impairment.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            onChange={handleDate}

            InputLabelProps={{
              shrink: true,
            }}
          />
          <div>
            <label>Veteran</label>
            <Checkbox
              onChange={handleVeteran}
            />
          </div>
        </div>
        <div className={userInfo.veteran == true ? "vet" : "none"}>
          <TextField
            id="Select Military Branch"
            select
            label="Military Branch"
            value={userInfo.vet}
            onChange={handleVetSelect}
            helperText="Please select your Disability."
          >
            {vet.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          id="Select Mobility"
          select
          label="Ammount of Mobility"
          value={userInfo.mobility}
          onChange={handleMobilitySelect}
          helperText="Please select your Disability."
        >
          {mobility.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>


      <div className={userInfo.type == "Coach" ? "coach" : "none"}>
        <div>
          <TextField
            id="select-state"
            select
            label="State"
            value={userInfo.state}
            onChange={handleStateSelect}
            helperText="Please select what State you're from."
          >
            {states.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="select-state"
            select
            label="State"
            value={userInfo.state}
            onChange={handleStateSelect}
            helperText="Please select what State you're from."
          >
            {states.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="Select Disability"
            select
            label="Disability"
            value={userInfo.disabilityTrue}
            onChange={handledisabilityTrueSelect}
            helperText="Please select your Disability."
          >
            {disabilityTrue.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          id="Select Mobility"
          select
          label="Ammount of Mobility"
          value={userInfo.mobility}
          onChange={handleMobilitySelect}
          helperText="Please select your Disability."
        >
          {mobility.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={userInfo.type == "Volunteer" ? "volunteer" : "none"}>
        <div>
          <TextField
            id="Select Disability"
            select
            label="Volunteer Type"
            value={userInfo.volunteerType}
            onChange={handleVolunteerTypeSelect}
            helperText="Please select your volunteer type"
          >
            {VolunteerType.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div>
          <TextField
            id="Select Disability"
            select
            label="Disability"
            value={userInfo.disabilityTrue}
            onChange={handledisabilityTrueSelect}
            helperText="Please select your Disability."
          >
            {disabilityTrue.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <TextField
          id="Select Mobility"
          select
          label="Ammount of Mobility"
          value={userInfo.mobility}
          onChange={handleMobilitySelect}
          helperText="Please select your Disability."
        >
          {mobility.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

    </form>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(ProfileForm);
