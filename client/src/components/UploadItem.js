import React, { Component } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";
import apiclient from "../apiclient";
import "./UploadItem.css"

export default class UploadItem extends Component {
    constructor(props) {
        super(props);

        this.subjectId = props.match.params.subjectId;

        this.state = {
            name: "",
            deadline: new Date(),
            targetItem: null,
            file: null,
            tasks: [],
            type: ""
        }

        apiclient.items.getBySubjectId(this.subjectId)
            .then(items => this.setState({ tasks: items.filter(t => t.type === "Practice task" || t.type === "Lab task") }));
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const data = new FormData(event.target);
            console.log(Array.from(data.entries()));
            await apiclient.items.post(data);
        } catch (err) {
            alert(err.message);
        }
    }

    render() {

        return (
            <div className="UploadItem">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name" bsSize="large">
                        <Form.Control
                            autoFocus
                            type="text"
                            name="name"
                            value={this.state.name}
                            placeholder="Назва роботи"
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    {
                        apiclient.user.role === "student" 
                         ?(<div>
                         <FormGroup controlId="targerItem">
                            <Form.Control as="select"
                                name="targetItem"
                                value={this.state.targetItem}
                                onChange={this.handleChange}
                                placeholder="завдання"
                            >
                                <option value={undefined}></option>
                                {
                                    this.state.tasks.map(task =>
                                        <option value={task._id}>{task.name}</option>)
                                }
                            </Form.Control>
                        </FormGroup>
                        <Form.Control type="hidden" name="type" value="Completed task"></Form.Control>
                        </div>)
                        :(<FormGroup controlId="type">
                            <Form.Control as="select"
                                name="type"
                                value={this.state.type}
                                onChange={this.handleChange}
                            >
                                <option value="Practice task">Практична робота</option>
                                <option value="Lab task">Лабораторна робота</option>
                                <option value="Lection">Лекція</option>
                            </Form.Control>
                        </FormGroup>)
                    }
                    <FormGroup controlId="file">
                        <Form.Control
                            type="file"
                            name="file"
                            value={this.state.file}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Form.Control type="hidden" name="subjectId" value={this.subjectId}></Form.Control>
                    
                    <Button type="submit" variant="success" disabled={this.state.file == null}>
                        Додати 
                    </Button>
                </Form>
            </div>
        )
    }
}