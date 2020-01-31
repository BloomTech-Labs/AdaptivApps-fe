import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { setAdapt } from '../ReduxStuff/actions/actions';
import { NavLink } from "react-router-dom";
import { getToken } from '../utils/AxiosWithAuth';

const Header = (props) => {
    const signedIn = getToken();

    console.log(props.state.fontSize)
    useEffect(() => {
        console.log(props)
    }, []);

    const Link = styled.button`
        background-color: ${props.state.backGround};
        color: ${props.state.fontColor};
        border: none;
        font-size: ${props.state.fontSize - 10}px;
        border-radius: 15%;
        &:focus{
            color: red;
            font-weight: bold;
            border: solid black 6px;
        }
        &:hover{
            color: ${props.state.backGround};
            background-color:${props.state.fontColor};
    }`;

    return (
        <div className="header">
            <img className="logo" src={require("../photos/ACS.png")} />
            <NavLink to={"/"}><Link> Home </Link></NavLink>
            {!signedIn && < NavLink to={"/signup"}><Link> Sign Up</Link></NavLink>}
            {!signedIn && <NavLink to={"/signin"}><Link> Sign In</Link></NavLink>}
            {signedIn && <NavLink to={"/events"}><Link> Events</Link></NavLink>}
            {signedIn && <NavLink to={"/logout"}><Link> Logout</Link></NavLink>}
        </div>
    )
};

function mapStateToProps(state) {
    console.log(state)
    return {
        state: state
    }
};

const mapDispatchToProps = {
    setAdapt
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (Header);