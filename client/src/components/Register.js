import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap, { FormControl } from "react-bootstrap";
import "./Login.css";
import apiclient from "../apiclient";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            middleName: "",
            lastName: "",
            role: "student"
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 && this.state.password == this.state.confirmPassword;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await apiclient.register({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                lastName: this.state.lastName,
                role: this.state.role,
                group: this.state.group
            });
            this.props.history.push("/login");

        } catch (err) {
            alert(err.message);
        }
    }

    render() {
        return (
            <div className="Login">
                <h1>Індивідуальний графік студентів</h1>
                <br></br>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="email" bsSize="large">
                        <Form.Control
                            autoFocus
                            type="email"
                            value={this.state.email}
                            placeholder="Електронна адреса"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" bsSize="large">
                        <Form.Control
                            value={this.state.password}
                            placeholder="Пароль"
                            onChange={this.handleChange}
                            type="password"
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" bsSize="large">
                        <Form.Control
                            value={this.state.confirmPassword}
                            placeholder="Повторіть пароль"
                            onChange={this.handleChange}
                            type="password"
                        />
                    </Form.Group>

                    <Form.Group controlId="firstName" bsSize="large">
                        <Form.Control
                            value={this.state.firstName}
                            placeholder="Прізвище"
                            onChange={this.handleChange}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group controlId="middleName" bsSize="large">
                        <Form.Control
                            value={this.state.middleName}
                            placeholder="Ім'я"
                            onChange={this.handleChange}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName" bsSize="large">
                        <Form.Control
                            value={this.state.lastName}
                            placeholder="По батькові"
                            onChange={this.handleChange}
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group controlId="role">
                        <Form.Control as="select"
                            name="role"
                            value={this.state.role}
                            onChange={this.handleChange}
                        >
                            <option value="student">Студент</option>
                            <option value="instructor">Викладач</option>
                            <option value="headOfTheDepartment">Завідуючий відділенням</option>
                        </Form.Control>
                    </Form.Group>


                    {
                        this.state.role === "student" && (
                            <Form.Group controlId="group">
                                <Form.Control
                                    name="role"
                                    value={this.state.group || null}
                                    onChange={this.handleChange}
                                    placeholder="Група"
                                    type="number"
                                >
                                </Form.Control>
                            </Form.Group>
                        )
                    }

                    <Button
                        block
                        variant="success"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Зареєструватися
                    </Button>

                </Form>
            </div>
        );
    }
}