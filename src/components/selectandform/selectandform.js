import React, { Component } from 'react';

import SurveyTypeSelect from '../surveytypeselect/surveyselect';

class SelectAndFrom extends Component {
    /*
        This component includes survey selection dropdown while filling survey.   
    */
    render() {
        return (
            <SurveyTypeSelect />
        );
    }
};

export default SelectAndFrom;