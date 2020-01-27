import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { setAdapt } from './ReduxStuff/actions';
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
            <img className="logo" src={require("./photos/ACS.png")} />
            <NavLink to={"/"}><Link> Home </Link></NavLink>
            <NavLink to={"/signup"}><Link> Sign Up</Link></NavLink>
            <NavLink to={"/signin"}><Link> Sign In</Link></NavLink>
            <NavLink to={"/events"}><Link> Events</Link></NavLink>
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