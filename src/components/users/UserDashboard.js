import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import UserInfo from "../ProfileForm";
import styled from "styled-components";
import RoleSelect from "../RoleSelect"

const UserDash = props => {
    console.log(props.match.params.id)
    const [userInfo, setUserInfo] = useState("");
    const [edit, setEdit] = useState(false);
    const [bio, setBio] = useState("");
    const [open, setOpen] = useState(false)
    useEffect(() => {
        axios
            .get(
                ``
            )
            .then(res => { setUserInfo(res.data); })
            .catch(err => {
                console.log(err);
            });
        window.chifPlayer.streamFiles();
    }, []);
    //needs to do this because it was setting bio asyc and was getting undefined for user info if in the use effect above. 
    useEffect(() => {
        setBio(` ${userInfo.bio}`)
    }, [userInfo]);
    console.log(userInfo)

    const handleEdit = e => {
        setEdit(!edit)
    }
    const handleChange = e => {
        setBio(e.target.value)
    }

    const saveBio = e => {
        axios.put(`http://localhost:5000/api/users/${localStorage.getItem("dummyId")}`, { "bio": bio })
        setEdit(!edit)
    }

    return (
        <div>
            <button onClick={() => {setOpen(!open)}}>Edit Info</button>
            <div className={open ? "x" : "none"}>
                <RoleSelect />
                <UserInfo />
            </div>
            <h1> {userInfo.firstname} {userInfo.lastname} </h1>
            <img src={userInfo.picture} />
            <div>
                <h4 className={edit ? "x" : "none"} onClick={() => { handleEdit() }}> X </h4>
                <h4 className={edit ? "none" : "edit"} onClick={() => { handleEdit() }}> Edit Bio </h4>
                <div className={edit ? "edit" : "none"}>
                    <textarea
                        name="bio"
                        value={bio}
                        onChange={handleChange} />
                    <button className={edit ? "save" : "none"} onClick={saveBio}> Save Bio </button>
                </div>
                <h3> Bio</h3>
                {/* <chear className="chifOne" src={require('')}></chear> */}
                {/* just drawing data from an old backend will put in our back end when we get those end points */}
                <p className={edit ? "none" : "edit"} > Hi! My name is {userInfo.firstname}! {bio} </p>
                <h3> My Upcoming Events</h3>
                <div>
                    Coming soon!
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(UserDash);
