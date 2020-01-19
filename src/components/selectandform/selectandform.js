import React, { Component } from 'react';
import { Dropdown, } from 'react-bootstrap';

import SurveyTypeSelect from '../surveytypeselect/surveyselect';

class SelectAndFrom extends Component {
    render() {
        return (
            <SurveyTypeSelect />
        );
    }
};

export default SelectAndFrom;