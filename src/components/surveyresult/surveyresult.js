import React, { Component } from 'react';
import axios from 'axios';
import SurveyForm from '../surveyform/surveyform';

class SurveyResult extends Component {

    // state to store the number of people gave selected particular option for particular question.
    state = {
        surveyResultCounts: {},
    };

    componentDidMount() {
        axios.get('https://survey-tool-eca20.firebaseio.com/surveydata.json')
        .then(result => {
            console.log(result.data);
            var obj = {};

            var stateObj = {
                ...this.state.surveyResultCounts,
            };

            Object.keys(result.data).map((element1, index) => {
                Object.keys(result.data[element1]['ans']).map((element2, index) => {
                    // result.data[element1]['ans'][element2]
                    if (this.state.surveyResultCounts != null) {
                        if(result.data[element1]['ans'][element2].question_id in stateObj) {
                            if(result.data[element1]['ans'][element2].answer in stateObj[result.data[element1]['ans'][element2].question_id]) {
                                stateObj[result.data[element1]['ans'][element2].question_id][result.data[element1]['ans'][element2].answer] = stateObj[result.data[element1]['ans'][element2].question_id][result.data[element1]['ans'][element2].answer] + 1; 
                            } else {
                                stateObj[result.data[element1]['ans'][element2].question_id][result.data[element1]['ans'][element2].answer] = 1;
                            }
                        } else {
                            var questionObj = {};
                            questionObj.question = result.data[element1]['ans'][element2].question;
                            questionObj[result.data[element1]['ans'][element2].answer] = 1;

                            stateObj[result.data[element1]['ans'][element2].question_id] = questionObj;
                        }
                    }
                });
            });

            console.log(stateObj);

            // this.setState({
            //     questions: {...obj},
            // });
            // console.log(this.state.questions);
        })
        .catch(error => {
            console.log(error);
        });
    };

    render() {
        return (<h1 style={{textAlign: 'center'}}>Patience my friend Patience!</h1>);
    }
};

export default SurveyResult;