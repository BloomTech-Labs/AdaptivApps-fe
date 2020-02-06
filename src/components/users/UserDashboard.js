import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import UserInfo from "../ProfileForm";
import styled from "styled-components";
import RoleSelect from "../RoleSelect";
import Video from '../VideoPlayer';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { positions } from '@material-ui/system';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';

const Banner = styled.img`
position: absolute;
top: 0;
left: 0;
width: 80vw;
height: 30vh;
z-index: -1;
`

const ProfilePic = styled.img`
border-radius: 55%;
position: absolute;
left: 1vw;
top: 20vh;
width: 30vw;
max-height: 60vh;
`

const InfoArea = styled.div`
position: absolute;
top 85vh;
width: 100%;
justify-content: space-evenly;
display: flex;
`

const Form = styled.div`
width: 25vw;
min-width: 300px;
height: 100vh;
position: fixed;
right:0;
top: 0;
z-index: 100;
background: white;
`
const EventRoles = styled.div`
position: absolute;
width: 80%;
top: 110vh;
left 12%; 
margin-bottom: 2%;
`

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
        axios.put(``, { "bio": bio })
        setEdit(!edit)
    }

    return (

        <div>
            <Banner
                src={require('../../photos/track.jpg')}
            />
            <ProfilePic src={require('../../photos/placehold.jpg')} />
            <Video />
            <FormControlLabel
                zIndex="tooltip"
                style={{ position: "absolute", right: "10%" }}
                control={<Switch edit={!edit} onChange={handleEdit} />}
                label="Show"
            />

            <Slide direction="left" in={edit} mountOnEnter unmountOnExit>
                <Paper elevation={0} >
                    <Form zIndex="modal">
                        <FormControlLabel
                            zIndex="tooltip"
                            style={{ position: "relative", right: "10%", top: "1%" }}
                            control={<Switch edit={edit} onChange={handleEdit} />}
                            label="Show"
                        />
                        Edit Profile
                        <UserInfo />
                    </Form>
                </Paper>
            </Slide>

            <h1> {userInfo.firstname} {userInfo.lastname} </h1>
            <InfoArea>
                <div>
                    <h3> Bio</h3>
                    {/* <chear className="chifOne" src={require('')}></chear> */}
                    {/* just drawing data from an old backend will put in our back end when we get those end points */}
                    <p className={edit ? "none" : "edit"} > Hi! My name is {userInfo.firstname}! {bio} </p>
                    <button className={edit ? "x" : "none"} onClick={() => { handleEdit() }}> X </button>
                    <button className={edit ? "none" : "edit"} onClick={() => { handleEdit() }}> Edit Bio </button>
                    <div className={edit ? "edit" : "none"}>
                        <textarea
                            name="bio"
                            value={bio}
                            onChange={handleChange}
                            style={{ border: "solid black 1px" }} />
                        <button className={edit ? "save" : "none"} onClick={saveBio}> Save Bio </button>
                    </div>
                </div>
                <div>
                    <h3> My Upcoming Events</h3>
                    <div>
                        Coming soon!
                    </div>
                </div>
            </InfoArea>
            <EventRoles>
            <RoleSelect />
            </EventRoles>
        </div>
    );
};

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(UserDash);
