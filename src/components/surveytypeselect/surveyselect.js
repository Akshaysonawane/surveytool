import React, { Component } from 'react';
import axios from 'axios';
import { Dropdown,} from 'react-bootstrap';
import { connect } from 'react-redux'

import classes from './surveyselect.module.css';
import SurveyForm from '../surveyform/surveyform';

class SurveySelect extends Component {

    state = {
        surveyTypes : null,
        typeSelected: false,
    };
    
    componentDidMount() {
        axios.get('https://cors-anywhere.herokuapp.com/https://survey-tool-eca20.firebaseio.com/surveytypes.json?auth=' + this.props.token)
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
            console.log(error);
        });
    };

    setSurveyType = () => {
        var select = null;
        select = document.getElementById("surveytypeselect").value;
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
        var selectedId = null, surveyForm = null;
        if(this.state.typeSelected !== false) {
            selectedId = this.state.surveyTypes.indexOf(this.state.typeSelected) + 1;
            surveyForm = <SurveyForm typeselected={this.state.typeSelected} selectedId={selectedId}/>;
        } else {
        surveyForm = <h3 style={{padding: '10rem'}}>Please select survey from dropdown</h3>
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
                <Dropdown className={classes.dropdown}>
                    <Dropdown.Header>Survey Available</Dropdown.Header>
                    <select id="surveytypeselect" className="browser-default custom-select" onChange={this.setSurveyType}>
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
        loading: state.loading,
        token: state.token,
        error: state.error,
        isAuthenticated: state.token !== null,
        authRedirectPath: state.authRedirectPath,
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
//     };
// }

export default connect(mapStateToProps)(SurveySelect);