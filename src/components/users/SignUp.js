import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../ReduxStuff/actions/actions";
import styled from 'styled-components'

const CreateAccount = props => {
    const [background, setBackground] = useState(props.backGround)

    useEffect(() => {
        if (props.backGround == "lightblue") {
            setBackground("white")
        }
        else {
            setBackground(props.backGround)
        }
    }, [props]);

    console.log(props)
    const [form, setForm] = useState({
        full_name: "",
        location: "",
        email: "",
        username: "",
        password: ""
    });

    const Label = styled.label`
    font-size: ${props.fontSize - 10}px;
    color: ${props.fontColor};
    `
    const Header = styled.h1`
    font-size: ${props.fontSize}px;
    color: ${props.fontColor};
    `
    const Form = styled.form`
    background-color: ${background};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 5%;
    `

    const Input = styled.input`
    font-size: ${props.fontSize - 10}px;
    `


    console.log("this is the form", form);
    const handleSubmit = e => {
        e.preventDefault();
        props.signUp(form);
        props.history.push("/home");
    };
    const handleChanges = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Header>
                Join Our ACS Team!
          </Header>

            <div className="register-title">
                <h3>Your Information</h3>
            </div>
            <Label> Full Name</Label>
            <Input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChanges}
            />
            <Label> Location (State) </Label>
            <Input
                type="location"
                name="location"
                placeholder="Location(state)"
                value={form.location}
                onChange={handleChanges}
            />
            <Label>Email </Label>
            <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChanges}
            />

            <Label> Username </Label>
            <Input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChanges}
            />
            <Label> Password </Label>
            <Input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChanges}
            />
            <div>
                <button type="submit">Sign Up</button>

                <Link
                    style={{
                        textDecoration: "none",
                        color: "#FE0707",
                        fontSize: "14px",
                        fontWeight: "bold"
                    }}
                    to="/login"
                >
                    Already have an Account?
            </Link>
            </div>
        </Form>
    );
};
const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { signUp })(CreateAccount);