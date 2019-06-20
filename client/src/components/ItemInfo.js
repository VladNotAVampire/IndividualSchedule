import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import RateWork from './RateWork';

export default class ItemInfo extends Component {

    constructor(props) {
        super(props);

        this.itemType = "Student work";

        this.state = {
            itemName: "Практична робота №1",
            subject: "Основи оверінжинірінгу",
            studentName: "Прізвище Ім'я Побатькові",
            group: 45
        }
    }

    render() {
        return (
            <div>
                <div style={{ maxWidth: "500px", margin: "0 auto" }}>

                    <p>{this.state.itemName}</p>
                    <p>Студент: {this.state.studentName}</p>
                    <p>Дисципліна: {this.state.subject}</p>
                    <p>Група: {this.state.group}</p>
                    <Button block variant="success">
                        Завантажити роботу
                </Button>

                    {this.itemType === "Student work"
                        ? (<div style={{padding: "40px 0"}}>
                            <RateWork />
                        </div>)
                        : (<br />)
                    }
                </div>
            </div>
        )
    }
}