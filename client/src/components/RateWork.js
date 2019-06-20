import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

export default class RateWork extends Component {

    constructor(props) {
        super(props);

        this.itemId = props.itemId

        this.state = {
            rate: '',
            comment: '',
        }
    }

    render() {
        return (
            <div style={{ textAlign: "left" }}>
                Оцінити
                <div style={{ borderWidth: 1, borderStyle: "solid", borderRadius: 3, borderColor: "green" }}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Оцінка</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="number"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    Коментар
                <InputGroup>
                        <FormControl as="textarea" />
                    </InputGroup>
                    <br/>
                    <Button variant="success" block>
                        Поставити оцінку
                    </Button>
                </div>
            </div>
        )
    }
}