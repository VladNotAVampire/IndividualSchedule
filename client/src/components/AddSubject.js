import React from 'react';
import { Form, Button } from 'react-bootstrap';
import apiclient from '../apiclient';

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export default class AddSubject extends React.Component {

    state = {
        name: "",
        courses: [],
        specialities: [],
        created: false
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const subject = { name: this.state.name, courses: this.state.courses, specialities: this.state.specialities }
            await apiclient.subjects.post(subject);
            //this.setState({created: true});
            this.props.history.push("/subjects");
        } catch (err) {
            alert(err.message);
        }
    }

    render() {

        return (
            <div className="AddSubject" style={{ maxWidth: 500, margin: "0 auto", padding: "30px 0" }}>
                <Form>
                    <Form.Group controlId="name" bsSize="large">
                        <Form.Control
                            autoFocus
                            type="text"
                            value={this.state.name}
                            placeholder="Назва дисципліни"
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <div key="inline-checkbox" className="mb-3">
                        Курс:
                        {
                            [1, 2, 3, 4].map(course =>
                                <Form.Check
                                    inline
                                    label={course}
                                    type="checkbox"
                                    onChange={e => {                                  
                                        if (e.target.checked)
                                            this.setState({ courses: [...this.state.courses, course].filter(onlyUnique) });
                                        else
                                            this.setState({ courses: this.state.courses.filter(c => {console.log(c + ":" + course);return c != course }) });

                                        console.log(this.state);
                                    }}
                                    id={`inline-checkbox-${course}`}></Form.Check>)
                        }
                    </div>

                    {["Розробка ПЗ",
                        "Монтаж і експлуатація електроустаткування",
                        "Обробка матеріалів",
                        "Виробництво електроосвітлювальних приладів",
                        "Обслуговування комп'ютерних систем і мереж"].map(spec =>
                            <Form.Group bsSize="large">
                                <Form.Check
                                    type="checkbox"
                                    size="lg"
                                    onChange={e => {
                                        if (e.target.checked)
                                            this.setState({ specialities: [...this.state.specialities, spec].filter(onlyUnique) });
                                        else
                                            this.setState({ specialities: this.state.specialities.filter(s => s != spec) });

                                        console.log(this.state);
                                    }}
                                    label={spec}
                                />
                            </Form.Group>)}

                    <Button block variant="success" onClick={this.handleSubmit} type="submit">Додати</Button>
                </Form>
            </div>
        );
    }
}