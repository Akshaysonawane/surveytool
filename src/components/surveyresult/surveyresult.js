import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';

class SurveyResult extends PureComponent {

    // state to store the number of people gave selected particular option for particular question.
    state = {
        surveyResultCounts: {},
    };

    getSlectedSurveyResult = () => {
        var stateObj = { };

        axios.get('https://survey-tool-eca20.firebaseio.com/'+ this.props.typeselected.trim() +'.json?auth=' + this.props.token)
        .then(result => {
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

            this.setState(prevState => {
                let prevObjString = JSON.stringify(prevState.surveyResultCounts);
                let currentObjString = JSON.stringify(stateObj);
                if(prevObjString !== currentObjString)
                {
                    return {
                        surveyResultCounts: {...stateObj},
                    }
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getSlectedSurveyResult();
    };


    componentDidUpdate() {
        this.getSlectedSurveyResult();
    };

    render() {
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

            data.labels = [];
            labels.shift();
            data.labels = [...labels]
            data.datasets[0].data = [];
            data.datasets[0].label = this.state.surveyResultCounts[ele1]['question'];
            data.datasets[0].data = [...data_values];
            
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

const mapStateToProps = state => {
    return {
        loading: state.loading,
        token: state.token,
        error: state.error,
        isAuthenticated: state.token !== null,
        authRedirectPath: state.authRedirectPath,
    };
}

export default connect(mapStateToProps)(SurveyResult);