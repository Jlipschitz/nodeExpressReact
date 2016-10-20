import React, { Component } from 'react';
import date from '../../utils/prettyDate';

export default class Date extends Component {
    render() {
        return (
            <div>
                <span className="nav-date" id="current-date">
                {date.prettyDate(this.props.currentDate)} {date.prettyTime(this.props.currentDate)}
                </span>
            </div>
        )
    }
}