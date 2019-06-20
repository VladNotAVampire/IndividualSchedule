import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Bootstrap, { FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./Login.css";
import apiclient from "../apiclient";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            rememberMe: false
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            await apiclient.login(this.state.email, this.state.password, this.state.rememberMe);
            this.props.history.push("/subjects");
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
                   
                    <Button
                        block
                        variant="success"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Увійти
                    </Button>

                        <br/>
                    <Form.Group controlId="rememberMe" bsSize="large">
                        <Form.Control
                            value={this.state.rememberMe}
                            onChange={this.handleChange}
                            type="checkbox"
                        /> Запам'ятати мене
                    </Form.Group>
                </Form>

                <div style={{padding: "60px 0"}}>
                    <Link to="/register">
                        Зареєструватися
                    </Link>
                </div>
            </div>
        );
    }
}