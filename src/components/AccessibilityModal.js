import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from 'react-redux';
import { setAdapt } from './ReduxStuff/actions';

const Modul = (props) => {
    console.log(props)
    const [fontSize, setFontSize] = useState(34);
    const [contrast, setContrast] = useState("#000000");
    const [background, setBackground] = useState("lightblue");
    const [open, setOpen] = useState(false);

    const adaptions = {
        "fontSize" : fontSize,
        "fontColor" : contrast,
        "backGround" : background
    }
    const contraster = () => {
        setContrast("white");
        setBackground("black");
    }

    const greyer = () => {
        setContrast("#C8D1E0");
        setBackground("#333840");
    }

    const bigger = () => {
        setFontSize(fontSize + 4);
    }

    const smaller = () => {
        setFontSize(fontSize - 4);
    }

    const reset = () => {
        setContrast("black");
        setBackground("lightblue")
        setFontSize(34)
    }

    const close = () => {
        props.setAdapt(adaptions)
        setOpen(!open) 
    }





    const Button = styled.button`
        margin-top: 5%;
        border: none;
        color: ${contrast};
        background-color: ${background};
        font-size: ${fontSize - 10}px;
        &:focus{
            color: red;
            font-weight: bold;
            font-size: ${fontSize - 5}px;
            border: solid black 6px;
        }
    `

    const mainRef = useRef(null);

    useEffect(() => {
        mainRef.current.focus();
    }, [mainRef]);

    return (
        <>
            <button className={open ? "closed" : "adapt"} onClick={() => { setOpen(!open)}}> OPEN ADAPT</button>
            <div  ref={mainRef} tabIndex="-1" className={open ? "modul" : "closed"}>
                <Button onClick={() => { bigger() }}> LARGER FONT</Button>
                <Button onClick={() => { smaller() }}> SMALLER FONT</Button>
                <Button onClick={() => { contraster() }} > HIGH CONTRAST</Button>
                <Button onClick={() => { greyer() }}> GREY SCALE </Button>
                <Button onClick={() => { reset() }}> RESET</Button>
                <Button onClick={() => { close()}}> CLOSE</Button>
            </div>
        </>
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
    (Modul);