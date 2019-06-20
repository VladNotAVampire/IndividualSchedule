import React, { Component } from "react";
import { ListGroupItem, ListGroup, Button, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import "./ItemsList.css";
import apiclient from "../apiclient";
import { Link } from 'react-router-dom';
import ApiClient from "../apiclient/apiclient";

export default class OwnItems extends Component {

    constructor(props) {
        super(props);
        console.log(props);

        this.subjectId = props.match.params.subjectId;

        this.state = {
            items: [],
            
        }

        apiclient.items.ownTasks(this.subjectId)
            .then(items => {
                this.setState({ items });
            });
    }

    render() {
        return (
            <div className="ItemsList">
                <div className="content">
                    
                    <div className="list">
                        <ListGroup>
                            {
                                this.state.items.map(item =>
                                    <Link to ={"/items/file/" + item._id}>
                                        <ListGroupItem variant="info">
                                            <span class="itemname">{item.name}</span>
                                            <i class="downloadicon"></i>
                                        </ListGroupItem>
                                    </Link>)
                            }
                        </ListGroup>
                    </div>
                    
                </div>
            </div>)
    }
}