import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../ReduxStuff/actions/actions";
import styled from 'styled-components'

const CreateAccount = props => {
    console.log(props)
    const [form, setForm] = useState({
        full_name: "",
        location: "",
        email: "",
        username: "",
        password: ""
    });

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
        <form onSubmit={handleSubmit}>
            <header>
                Join Our ACS Team!
          </header>

            <div className="register-title">
                <h3>Your Information</h3>
            </div>
            <label> Full Name</label>
            <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChanges}
            />
            <label> Location (State) </label>
            <input
                type="location"
                name="location"
                placeholder="Location(state)"
                value={form.location}
                onChange={handleChanges}
            />
            <label>Email </label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChanges}
            />

            <label> Username </label>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChanges}
            />
            <label> Password </label>
            <input
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
        </form>
    );
};
const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps, { signUp })(CreateAccount);