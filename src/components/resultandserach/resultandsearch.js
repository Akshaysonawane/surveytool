import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown,} from 'react-bootstrap';
import { connect } from 'react-redux';

import classes from '../surveytypeselect/surveyselect.module.css';
import SurveyResult from '../surveyresult/surveyresult';

class SurveyResultSelect extends Component {
    // state to store survey types available in firebase database
    state = {
        surveyTypes : null,
        typeSelected: false,            // state varibale to store selected survey type from dropdown  
    };
    
    /* getting survey types from firebase and storing in state.
        using workarroung found online to bypass cors policy error
    */ 
    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://survey-tool-eca20.firebaseio.com/surveytypes.json?auth='+this.props.token)
        .then(result => {
            var surveyTypes = [];
            surveyTypes = Object.keys(result.data['-LygnJeqU02csBjH_jpr']).map(element => {
                return result.data['-LygnJeqU02csBjH_jpr'][element].name;
            });

            this.setState({
                surveyTypes: surveyTypes,
            });
        })
        .catch(error => {
            // Loggin error in console, Need to show proper error message popup to user.
            console.log(error);
        });
    };

    // fcuntion to set typeSelected in state to slected survey type from dropdown
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
    };

    render() {
        var surveyForm = null;
        if(this.state.typeSelected !== false) {
            // selectedId = this.state.surveyTypes.indexOf(this.state.typeSelected) + 1;
            // Display Survey result if type is selected from dropdown
            surveyForm = <SurveyResult typeselected={this.state.typeSelected}/>;
        } else {
            // If survey type not selected then displaying a message
            // UI needs to be improved here too
            surveyForm = <h3 style={{padding: '10rem'}}>Please select survey from dropdown</h3>
        }

        // Creating a varibale to display survey type in dropdown
        var listItems;
        if(this.state.surveyTypes != null) {
            listItems = this.state.surveyTypes.map((element, index) => {
                return (
                    <option value={element} key={index}>{element}</option>
                );
            });
        } else {
            // Message to show in dropdown if survey types are nto loaded
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

const mapStateToProps = state => {
    return {
        token: state.token,
        error: state.error,
        isAuthenticated: state.token !== null,
    }
}

export default connect(mapStateToProps)(SurveyResultSelect);