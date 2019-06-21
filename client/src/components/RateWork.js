import React, { Component } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import apiclient from '../apiclient';

export default class RateWork extends Component {

    constructor(props) {
        super(props);

        this.itemId = props.itemId

        this.state = {
            rate: '',
            comment: '',
        }
    }

    setMark = async () => {
        try{
            await apiclient.items.setMark(this.props.itemId, +this.state.rate, this.state.comment || undefined);
            alert("Оцінку поставлено")
        }
        catch(error){
            alert("Не вдалося поставити оцінку");
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
                            value={this.state.rate}
                            onChange={e => this.setState({rate: e.target.value})}
                        />
                    </InputGroup>

                    Коментар
                <InputGroup>
                        <FormControl as="textarea" 
                        value={this.state.comment}
                        onChange={e => this.setState({comment: e.target.value})}/>
                    </InputGroup>
                    <br/>
                    <Button variant="success" block onClick={this.setMark}>
                        Поставити оцінку
                    </Button>
                </div>
            </div>
        )
    }
}