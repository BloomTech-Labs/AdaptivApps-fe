import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { setAdapt } from '../ReduxStuff/actions/actions';
import { NavLink } from "react-router-dom";

const Header = (props) => {
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
    margin: 15%;
    &:focus{
        color: red;
        font-weight: bold;
        border: solid black 6px;
    }
    &:hover{
        color: ${props.state.backGround};
        background-color:${props.state.fontColor};
    }
    
    `

    return (
        <div className="header">
            <img className="logo" src={require("../photos/ACS.png")} />
            <NavLink to={"/"} style={{width: "100%"}}><Link> Home </Link></NavLink>
            <NavLink to={"/signup"} style={{width: "100%"}} ><Link> Sign Up</Link></NavLink>
            <NavLink to={"/signin"} style={{width: "100%"}} ><Link> Sign In</Link></NavLink>
            <NavLink to={"/events"} style={{width: "100%"}} ><Link> Events</Link></NavLink>
        </div>
    )

}

function mapStateToProps(state) {
    console.log(state)
    return {
        state: state
    }
}

const mapDispatchToProps = {
    setAdapt
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (Header);