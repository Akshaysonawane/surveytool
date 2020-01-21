import React, { Component } from 'react';
import axios from 'axios';
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';

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

            this.setState({
                surveyResultCounts: {...stateObj},
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    render() {
        var graphs, labels =  null;
        var data_values = [];
        var data = {
            datasets: [{
                data: [],
                backgroundColor: [
                    'red',
                    'orange',
                    'yellow',
                ],
                label: 'Surevy Data'
            }],
            labels: [],
        };
        graphs = Object.keys(this.state.surveyResultCounts).map((ele1, index1) => {
            labels = Object.keys(this.state.surveyResultCounts[ele1]).map((ele2, index2) => {
                if(ele2 !== 'question') {
                    data_values.push(this.state.surveyResultCounts[ele1][ele2]);
                    return ele2;
                }
            });
            data.labels = [];
            data.labels = [...labels]
            data.datasets[0].data = [];
            data.datasets[0].data = [...data_values];
            console.log(data);
            return (
                <Bar
                    data={data}
                    options={{ maintainAspectRatio: false }}
                />
            );
        });
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Patience my friend Patience!</h1>
                {graphs}
            </div>
        );
    }
};

export default SurveyResult;