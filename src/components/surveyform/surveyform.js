import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { 
    Card, 
    Button,
    Form,
} from 'react-bootstrap';

import classes from './surveyform.module.css';

class SurveyForm extends Component {

    state = {
        questions: null,
        answers: [],
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

    saveSurveyData = (selectedSurveytype) => {
        console.log(this.state.answers);
        var ansObj = {'ans': [...this.state.answers]};
        console.log(ansObj);
        axios.post('https://survey-tool-eca20.firebaseio.com/'+ selectedSurveytype +'.json', ansObj)
        .then(result => {
            this.props.history.push('/results');
        })
        .catch(error => {
            alert(error);
        });
    };

    setAnswer = (question_id, question) => {
        // alert(question_id);
        var ans_obj = {};
        ans_obj.question_id = question_id;
        ans_obj.question = question;
        var ele = document.getElementsByName(question_id + '_ans');

        for(let i = 0; i < ele.length; i++) { 
            if(ele[i].checked) 
            ans_obj.answer = ele[i].value; 
        };

        // console.log(ans_obj);

        this.setState({
            answers: [...this.state.answers, ans_obj],
        });

        console.log(this.state);
    }
p
    render() {
        var form  = null;
        
        if(this.state.questions != null) {
            form  = Object.keys(this.state.questions).map((ele, index) => {
                if(this.state.questions[ele].survey_types.indexOf(this.props.selectedId) !== -1) {
                    return (
                        <Form.Group key={index}>
                        <Card body border="primary" style={{ width: 'auto' }}>
                        <Form.Label>{this.state.questions[ele].question}</Form.Label>
                        <Form.Check 
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
                    {/* <input type="submit" value="Submit Servey" onClick={this.saveSurveyData}></input> */}
                </Form> 
            </div>
        );
    }
}

export default withRouter(SurveyForm);