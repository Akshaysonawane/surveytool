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
            
            // var surveyTypes = [];
            // console.log(result.data['-LygnJeqU02csBjH_jpr']);
            // surveyTypes = Object.keys(result.data['-LygnJeqU02csBjH_jpr']).map(element => {
            //     return result.data['-LygnJeqU02csBjH_jpr'][element].name;
            // });

            // console.log(obj);

            this.setState({
                questions: {...obj},
            });
            // console.log(this.state.questions);
        })
        .catch(error => {
            console.log(error);
        });
    };

    render() {
        return (
            <div>
                <form>
                    <input type="radio" name="gender" value="male" checked /> Male<br/>
                    <input type="radio" name="gender" value="female" /> Female<br/>
                    <input type="radio" name="gender" value="other" /> Other  
                </form> 
            </div>
        );
    }
}

export default SurveyForm;