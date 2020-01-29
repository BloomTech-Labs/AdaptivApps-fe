import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import Select from 'react-select';
import "../App.css"

const ProfileForm = props => {
    const [userInfo, setUserInfo] = useState({
        disabilities: "",
        type: "",
        state: "",
        city: "",
    });

    console.log(userInfo.disabilities)
    const handleChange = e => {
        let name = e.target.name;
        setUserInfo({ ...userInfo, [name]: e.target.value });
    };
    const handleSelect = selected => {
        setUserInfo({ ...userInfo, disabilities: selected.value })
    }
    const handleStateSelect = selected => {
        setUserInfo({ ...userInfo, state: selected.value })
    }
    const handleTypeSelect = selected => {
        setUserInfo({ ...userInfo, type: selected.value })
    }
    const handleEventSelect = selected => {
        setUserInfo({ ...userInfo, event: selected.value })
    }
    const handleImpairmentSelect = selected => {
        setUserInfo({ ...userInfo, impairment: selected.value })
    }
    console.log(userInfo)


    //array of disabilities for the select
    const disabilities = [
        { label: "Athetosis", value: "Athetosis" },
        { label: "Impaired Muscle Power", value: "Impaired Muscle Power" },
        { label: "Impaired Passive Range of Movement", value: "Impaired Passive Range of Movement" },
        { label: "Limb Deficiency", value: "Limb Deficiency" },
        { label: "Leg Length Difference", value: "Leg Length Difference" },
        { label: "Visual Impairment", value: "Vision" },
        { label: "Short Stature", value: "Short Stature" },
        { label: "Hypertonia", value: "Hypertonia" },
        { label: "Ataxia", value: "Ataxia" },
        { label: "Intellectual Impairment", value: "Intellectual Impairment" },
        { label: "None", Value: "None" }
    ]
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
    ]
    //array of events
    const events = [

    ]
    const impairment =
    [
    { label: "ALS",  value: "ALS" },
    { label: "Amputation / Limb Difference",  value: "Amputation / Limb Difference" },
    { label: "Arthrogryposis" ,  value: "Arthrogryposis" },
    { label: "Ataxia",  value: "Ataxia" },
    { label: "Blind / Visual Impairment",  value: "Blind / Visual Impairment" },
    { label: "Brachial Plexus Injury",  value: "Brachial Plexus Injury" },
    { label: "Cauda Equina syndrome",  value: "Cauda Equina syndrome" },
    { label: " Cerebal Palsy",  value: " Cerebal Palsy" },
    { label: "Chronic joint immobilization / Arthritis" ,  value: "Chronic joint immobilization / Arthritis" },
    { label: "CMT - Charcot - Maire - Tooth",  value: "CMT - Charcot - Maire - Tooth" },
    { label: "Drop Foot",  value: "Drop Foot" },
    { label: "Dwarfism",  value:  "Dwarfism" },
    { label: " Ehlers Danos Syndrom",  value: " Ehlers Danos Syndrom" },
    { label: "Fibromyalgia",  value: "Fibromyalgia" },
    { label: "Guillain–Barré syndrome",  value:"Guillain–Barré syndrome" },
    { label: "Leg Length Difference",  value: "Leg Length Difference" },
    { label: "Multiple Sclerosis",  value: "Multiple Sclerosis" },
    { label: "Muscular Dystrophy",   value: "Muscular Dystrophy" },
    { label: "Osteogenesis imperfecta",  value: "Osteogenesis imperfecta" },
    { label: "Osteoporosis",  value: "Osteoporosis" },
    { label: "Parkinsons",  value: "Parkinsons" },
    { label: "Polio",  value: "Polio" },
    { label: "Prader - Willi Syndrome(PWS)",  value: "Prader - Willi Syndrome(PWS)" },
    { label: "Short Stature",  value: "Short Stature" },
    { label: "Spina Bifida",  value: "Spina Bifida" },
    { label: "Spinal Cord Injury - Paraplegia" ,  value: "Spinal Cord Injury - Paraplegia" },
    { label: "Spinal Cord Injury - Quadraplegia" ,  value: "Spinal Cord Injury - Quadraplegia" },
    { label: "Stroke" ,  value: "Stroke" },
    { label: "TBI" ,  value: "TBI" },
    { label: "Other",  value: "Other" },
    ]
    return (
        <form>

            <label>Disability</label>
            <input
                type="text"
                name=""
                placeholder=""
                value={userInfo.disabilities}
                onChange={handleChange}
            />


            <label>State</label>
            <Select options={states}
                name="disabilities"
                value={userInfo.state}
                onChange={handleStateSelect}
                placeholder={userInfo.state} />

            <label>City</label>
            <input
                type="text"
                name="city"
                placeholder=""
                value={userInfo.city}
                onChange={handleChange}
            />

            <label>User Type</label>
            <Select options={userType}
                name="type"
                value={userInfo.type}
                onChange={handleTypeSelect}
                placeholder={userInfo.type} />

            {/* Can use is multi to give people multiple options not required though. */}
            {/* made it so certain things only display depending on the user type */}
            <div className={userInfo.type == "Athlete" ? "athlete" : "none"}>
                <label>Disability Group</label>
                <Select options={disabilities}
                    name="disabilities"
                    value={userInfo.disabilities}
                    onChange={handleSelect}
                    placeholder={userInfo.disabilities} />

                <label>Specific Disability</label>

                <Select options={impairment}
                    name="impairment"
                    value={userInfo.impairment}
                    onChange={handleImpairmentSelect}
                    placeholder={userInfo.disabilities} />
            </div>

        </form>
    )
}

const mapStateToProps = state => {
    return state;
};


export default connect(
    mapStateToProps)
    (ProfileForm);