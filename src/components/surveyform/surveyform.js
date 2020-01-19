import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown, } from 'react-bootstrap';

class SurveyForm extends Component {

    state = {
        questions: null,
    };

    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://survey-tool-eca20.firebaseio.com/questions.json')
        .then(result => {
            // console.log(result.data);
            var obj = {};
            Object.keys(result.data).map((element1, index) => {
                Object.keys(result.data[element1]).map((element2, index) => {
                    obj[element2] = {...result.data[element1][element2], survey_types: [...result.data[element1][element2].survey_types]};
                });
            });

            this.setState({
                questions: {...obj},
            });
            console.log(this.state.questions);
        })
        .catch(error => {
            console.log(error);
        });
    };

    render() {
        var form  = null;
        
        if(this.state.questions != null) {
            form  = Object.keys(this.state.questions).map((ele, index) => {
                if(this.state.questions[ele].survey_types.indexOf(this.props.selectedId) !== -1) {
                    return (
                        <div key={index}>
                        <p>{this.state.questions[ele].question}</p>
                        <input type="radio" name={ele + '_ans'} value={this.state.questions[ele]['option 1']} />{this.state.questions[ele]['option 1']}<br/>
                        <input type="radio" name={ele + '_ans'} value={this.state.questions[ele]['option 2']} />{this.state.questions[ele]['option 2']}<br/>
                        <input type="radio" name={ele + '_ans'} value={this.state.questions[ele]['option 3']} />{this.state.questions[ele]['option 3']}
                        </div>
                    );
                }
            });
        }

        return (
            <div>
                <form>
                    {form}
                </form> 
            </div>
        );
    }
}

export default SurveyForm;