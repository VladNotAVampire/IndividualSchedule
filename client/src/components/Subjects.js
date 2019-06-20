import React, { Component } from "react";
import { ListGroup, ListGroupItem, Dropdown, Button } from "react-bootstrap";
import apiclient from "../apiclient";
import { Link } from 'react-router-dom';
import './Subjects.css';

export default class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            loading: true,
            spec: "Розробка ПЗ",
            course: 1,
            error: null
        };

        apiclient.subjects.get()
            .then(subjects => this.setState({ subjects, loading: false }))
            .catch(error => this.setState({ error }));
    }

    render() {

        if (this.state.loading)
            return (<el>Loading..</el>);

        if (this.state.error) {
            return (
                <p style={{ backgroundColor: "#f00" }}>{this.state.error.message}</p>
            )
        }

        return (
            <div className="Subjects">

                <Dropdown id="coursedropdown">
                    Курс:
                    <Dropdown.Toggle variant="light">
                        {this.state.course}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {[1, 2, 3, 4].map(course =>
                            <Dropdown.Item key={course} onClick={() => this.setState({course})}>{course}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    Спеціальність:
                <Dropdown.Toggle variant="light">
                        {this.state.spec}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        ["Розробка ПЗ", 
                        "Монтаж і експлуатація електроустаткування",
                        "Обробка матеріалів",
                        "Виробництво електроосвітлювальних приладів",
                        "Обслуговування комп'ютерних систем і мереж"].map(spec => 
                            <Dropdown.Item key={spec} onClick={() => this.setState({spec})}>{spec}</Dropdown.Item>
                        )
                    }
                    </Dropdown.Menu>
                    <br />
                </Dropdown>
                <ListGroup>{
                    this.state.subjects
                            .filter(subject => subject.specialities.includes(this.state.spec) && subject.courses.includes(this.state.course))
                            .map(subject =>
                        //<a href={"/itemsList/" + subject._id} >
                        <Link to={"/itemsList/" + subject._id}>
                            <ListGroupItem variant="info">{subject.name}</ListGroupItem>
                        </Link>)
                    //</a>)
                }
                </ListGroup>

                {
                    apiclient.user.role === "instructor" && (
                        <div className="addSubjectButton">
                            <Link to="/addSubject">
                                <Button block variant="success">Додати нову дисципліну</Button>
                            </Link>
                        </div>
                    )
                }
            </div>
        );
    }
}