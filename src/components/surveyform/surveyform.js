import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import { 
    Card, 
    Button,
    Form,
} from 'react-bootstrap';

import classes from './surveyform.module.css';

class SurveyForm extends Component {
    /*
        This component fetches survey questions and display based on survey type selected by user.
    */

    // State to store questions fetched from firebase and answers submited by user
    state = {
        questions: null,
        answers: [],
    };

    // Calling firebase api to fetch questions from firebase
    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://survey-tool-eca20.firebaseio.com/questions.json?auth='+ this.props.token)
        .then(result => {
            var obj = {};
            Object.keys(result.data).map((element1, index) => {
                Object.keys(result.data[element1]).map((element2, index) => {
                    obj[element2] = {...result.data[element1][element2], survey_types: [...result.data[element1][element2].survey_types]};
                });
            });

            this.setState({
                questions: {...obj},
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    // function to submit answers to firebase and redirecting to results page
    saveSurveyData = (selectedSurveytype) => {
            var ansObj = { 'ans': [...this.state.answers] };
            axios.post('https://survey-tool-eca20.firebaseio.com/' + selectedSurveytype + '.json?auth='+this.props.token, ansObj)
                .then(result => {
                    this.props.history.push('/results');
                })
                .catch(error => {
                    console.log(error);     // Need to display proper error message to user 
                });
    };

    // function to set anwers for particular questions in state
    setAnswer = (question_id, question) => {
        var ans_obj = {};
        ans_obj.question_id = question_id;
        ans_obj.question = question;

        var ele = document.getElementsByName(question_id + '_ans');

        for(let i = 0; i < ele.length; i++) { 
            if(ele[i].checked) 
            ans_obj.answer = ele[i].value; 
        };

        this.setState({
            answers: [...this.state.answers, ans_obj],
        });
    }
p
    render() {
        var form  = null;
        
        // Create form to shwo questions based on type selected by user
        if(this.state.questions != null) {
            form  = Object.keys(this.state.questions).map((ele, index) => {
                if(this.state.questions[ele].survey_types.indexOf(this.props.selectedId) !== -1) {
                    return (
                        <Form.Group key={index}>
                        <Card body border="primary" style={{ width: 'auto' }}>
                        <Form.Label>{this.state.questions[ele].question}</Form.Label>
                        <Form.Check required
                            type="radio" 
                            name={ele + '_ans'}
                            value={this.state.questions[ele]['option 1']}
                            label={this.state.questions[ele]['option 1']} 
                            onChange={() => {this.setAnswer(ele, this.state.questions[ele].question)}}/>
                        <Form.Check
                            type="radio" 
                            name={ele + '_ans'} 
                            value={this.state.questions[ele]['option 2']}
                            label={this.state.questions[ele]['option 2']} 
                            onChange={() => {this.setAnswer(ele, this.state.questions[ele].question)}}/>
                        <Form.Check
                            type="radio" 
                            name={ele + '_ans'} 
                            value={this.state.questions[ele]['option 3']}
                            label={this.state.questions[ele]['option 3']}  
                            onChange={() => {this.setAnswer(ele, this.state.questions[ele].question)}}/>
                        </Card>
                        </Form.Group>
                    );
                }
            });
        }

        return (
            <div className={classes.questiondiv}>
                <Form className={classes.surveyform} onSubmit={(evt) => { evt.preventDefault() }}>
                    {form}
                    <Button type="submit" onClick={() => {this.saveSurveyData(this.props.typeselected)}}>
                        Submit Survey
                    </Button>
                </Form> 
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        token: state.token,
        error: state.error,
        isAuthenticated: state.token !== null,
    };
}

// using withRouter as I am using history props above to redirect to results page
export default withRouter(connect(mapStateToProps)(SurveyForm));