import React, { Component } from "react";
import { ListGroupItem, ListGroup, Button, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import "./ItemsList.css";
import apiclient from "../apiclient";
import { Link } from 'react-router-dom';
import ApiClient from "../apiclient/apiclient";

export default class ItemsList extends Component {

    constructor(props) {
        super(props);
        console.log(props);

        this.subjectId = props.match.params.subjectId;

        this.state = {
            subjects: [],
            type: { name: "Practice task", uk: "Практичні роботи" },
            types: [{ name: "Practice task", uk: "Практичні роботи" }, { name: "Lab task", uk: "Лабораторні роботи" }, { name: "Lection", uk: "Лекції" }]
        }

        if (apiclient.user.role === "instructor" || apiclient.user.role === "headOfTheDepartment")
            this.state.types.push("Completed task");

        apiclient.items.getBySubjectId(this.subjectId)
            .then(subjects => {
                this.setState({ subjects });
            });
    }

    render() {
        return (
            <div className="ItemsList">
                <div className="content">
                    <div className="filter">
                        <Dropdown onSelect={() => true}>
                            <span>Тип документа</span>
                            <Dropdown.Toggle variant="light">{this.state.type.uk}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.state.types.map(type =>
                                    <Dropdown.Item key={type.name} onClick={() => this.setState({ type })}>{type.uk}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="list">
                        <ListGroup>
                            {
                                this.state.subjects.filter(subject => subject.type === this.state.type.name).map(subject =>
                                    <a href={apiclient.baseUrl + "items/file/" + subject._id}>
                                        <ListGroupItem variant="info">
                                            <span class="itemname">{subject.name}</span>
                                            <i class="downloadicon"></i>
                                        </ListGroupItem>
                                    </a>)
                            }
                        </ListGroup>
                    </div>
                    <div className="uploaditembutton">
                        <Link to={"/uploadItem/" + this.subjectId}>

                            <Button variant="success" block>
                                Завантажити роботу
                            </Button>
                        </Link>
                        
                    </div>
                </div>
            </div>)
    }
}