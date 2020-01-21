import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown,} from 'react-bootstrap';

import classes from '../surveytypeselect/surveyselect.module.css';
import SurveyResult from '../surveyresult/surveyresult';

class SurveyResultSelect extends Component {

    state = {
        surveyTypes : null,
        typeSelected: false,
    };
    
    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://survey-tool-eca20.firebaseio.com/surveytypes.json')
        .then(result => {
            var surveyTypes = [];
            // console.log(result.data['-LygnJeqU02csBjH_jpr']);
            surveyTypes = Object.keys(result.data['-LygnJeqU02csBjH_jpr']).map(element => {
                return result.data['-LygnJeqU02csBjH_jpr'][element].name;
            });

            this.setState({
                surveyTypes: surveyTypes,
            });
        })
        .catch(error => {
            console.log(error);
        });
    };

    setSurveyType = () => {
        var select = null;
        select = document.getElementById("surveyresulttypeselect").value;
        if(select != null && select !== "select survey") {
            this.setState({
                typeSelected: select,
            });
        } else {
            this.setState({
                typeSelected: false,
            });
        }
        console.log(this.state.typeSelected);
    };

    render() {
        var selectedId = null, surveyForm = null;
        if(this.state.typeSelected !== false) {
            selectedId = this.state.surveyTypes.indexOf(this.state.typeSelected) + 1;
            surveyForm = <SurveyResult typeselected={this.state.typeSelected}/>;
        }

        var listItems;
        if(this.state.surveyTypes != null) {
            listItems = this.state.surveyTypes.map((element, index) => {
                return (
                    <option value={element} key={index}>{element}</option>
                );
            });
        } else {
            listItems = <option>Survey types not loaded yet</option>;
        }


        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Survey Results!!!</h1>
                <Dropdown className={classes.dropdown}>
                    <Dropdown.Header>Survey Available</Dropdown.Header>
                    <select id="surveyresulttypeselect" className="browser-default custom-select" onChange={this.setSurveyType}>
                        <option value="select survey" key={0}>select survey</option>
                        {listItems}
                    </select>      
                </Dropdown>
                {surveyForm}
            </div>
        );
    }
}

export default SurveyResultSelect;