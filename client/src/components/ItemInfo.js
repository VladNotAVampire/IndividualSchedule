import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import RateWork from './RateWork';
import apiclient from '../apiclient';

export default class ItemInfo extends Component {

    constructor(props) {
        super(props);

        this.itemType = "Student work";
        
        this.state = {
            item: {},
            loading: true
        }

        this.itemId = this.props.match.params.itemId

        apiclient.items.get(this.itemId)
            .then(item => this.setState({item, loading: false}));
    }

    render() {
        if (this.state.loading)
            return (<el>loading..</el>)

        return (
            <div>
                <div style={{ maxWidth: "500px", margin: "0 auto" }}>

                    <p>{this.state.item.name}</p>
                    <p>Студент: {this.state.item.user.firstName} {this.state.item.user.middleName} {this.state.item.user.lastName}</p>
                    <p>Дисципліна: {this.state.item.subject.name}</p>
                    <p>Група: {this.state.item.user.group}</p>
                    <a href={apiclient.baseUrl + "items/file/" + this.itemId}>
                        <Button block variant="success">
                            Завантажити роботу
                        </Button>
                    </a>

                    {this.itemType === "Student work"
                        ? (<div style={{ padding: "40px 0" }}>
                            <RateWork itemId={this.state.item._id}/>
                        </div>)
                        : (<br />)
                    }
                </div>
            </div>
        )
    }
}