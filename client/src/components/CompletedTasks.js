import React, { Component } from "react";
import { ListGroupItem, ListGroup, Button, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import "./ItemsList.css";
import apiclient from "../apiclient";
import { Link } from 'react-router-dom';
import ApiClient from "../apiclient/apiclient";

export default class CompletedTasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        };

        apiclient.items.completedTasks()
            .then(tasks => this.setState({ tasks }));
    }

    render() {
        return (
            <div className="ItemsList">
                <div className="content">

                    {
                        this.state.tasks.map(task =>
                            <div className="list">
                                <div style={{ textAlign: "left" }}>
                                    {task.name}
                                </div>

                                <ListGroup>
                                    {
                                        task.targetedItems.map(item =>
                                            <Link to={"/item/" + item._id }>
                                                <ListGroupItem variant="info">
                                                    <span class="itemname">{`${item.name}(${item.user.firstName || ""} ${item.user.middleName || ""} ${item.user.lastName || ""})`}</span>
                                                    <i class="downloadicon"></i>
                                                </ListGroupItem>
                                            </Link>

                                        )}
                                </ListGroup>
                            </div>)
                    }
                </div>
            </div>)
    }
}