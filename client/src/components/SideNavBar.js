import React from 'react';
import { Navbar, Glyphicon, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiclient from '../apiclient';

export default class SideNavPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    handleToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {

        return (
            <Navbar bg="success" variant="dark">
                <Navbar.Brand>
                    <NavDropdown title="=">
                        <NavDropdown.Item>
                            <Link to="/subjects">
                                Список дисциплін
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/ownItems">
                                Мої завдання
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/completedTasks">
                                Виконані завдання
                            </Link>
                        </NavDropdown.Item>
                        {
                            apiclient.role == "instructor" && (
                                <NavDropdown.Item>
                                    <Link to="/completed">
                                        Виконані завдання
                                    </Link>
                                </NavDropdown.Item>)
                        }
                        <NavDropdown.Item>
                            <Link to="/login">
                                Вийти
                            </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar>
        )
    }
}