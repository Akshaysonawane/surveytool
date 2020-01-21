import React, { PureComponent } from 'react';
import axios from 'axios';
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';
import { 
    Card, 
    Form,
} from 'react-bootstrap';

import SurveyForm from '../surveyform/surveyform';
import SurveyTypeSelect from '../surveytypeselect/surveyselect';

class SurveyResult extends PureComponent {

    // state to store the number of people gave selected particular option for particular question.
    state = {
        surveyResultCounts: {},
    };

    componentDidMount() {
        alert(this.props.typeselected);

        axios.get('https://survey-tool-eca20.firebaseio.com/'+ this.props.typeselected.trim() +'.json')
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

            // console.log(stateObj);

            this.setState({
                surveyResultCounts: {...stateObj},
            });
            // console.log(this.state.surveyResultCounts);
        })
        .catch(error => {
            console.log(error);
        });
    };


    componentDidUpdate() {
        // alert(this.props.typeselected);
        alert('blabla');

        var stateObj = { };

        axios.get('https://survey-tool-eca20.firebaseio.com/'+ this.props.typeselected.trim() +'.json')
        .then(result => {
            console.log(result.data);
            var obj = {};

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

            // console.log(stateObj);

            this.setState(prevState => {
                let prevObjString = JSON.stringify(prevState.surveyResultCounts);
                let currentObjString = JSON.stringify(stateObj);
                if(prevObjString !== currentObjString)
                {
                    console.log('104', stateObj);
                    return {
                        surveyResultCounts: {...stateObj},
                    }
                }
            },() => {
                console.log(this.state.surveyResultCounts);
            });
            // console.log(this.state.surveyResultCounts);
        })
        .catch(error => {
            console.log(error);
        });
    };

    render() {
        //alert(this.props.typeselected);
        var graphs, labels =  null;
        var data_values = [];
        var options = {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                }
                }]
            }
        };

        graphs = Object.keys(this.state.surveyResultCounts).map((ele1, index1) => {
            data_values = [];
            var data = {
                datasets: [{
                    data: [],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',       
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    label: 'Surevy Data'
                }],
                labels: [],
            };
            labels = Object.keys(this.state.surveyResultCounts[ele1]).map((ele2, index2) => {
                
                if(ele2 !== 'question') {
                    data_values.push(this.state.surveyResultCounts[ele1][ele2]);
                    return ele2;
                }
            });
            console.log(data_values);
           // return;
            data.labels = [];
            labels.shift();
            data.labels = [...labels]
            data.datasets[0].data = [];
            data.datasets[0].label = this.state.surveyResultCounts[ele1]['question'];
            data.datasets[0].data = [...data_values];

            console.log(data);
            
            return (
                    <Bar key={index1}
                        data={data}
                        width={20}
                        height={5}
                        options={{ 
                            ...options,
                            maintainAspectRatio: false }}
                    />
            );
        });

        return (
            <div style={{height: '20rem'}}>
                {graphs}
            </div>
        );
    }
};

export default SurveyResult;