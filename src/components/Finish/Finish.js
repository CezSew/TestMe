import React, { Component } from 'react';
import Error from '../Error/Error';

const Finish = (props) => {
    const getCorrectNumber = () => {
        let count = 0;
        props.stats.forEach((item) => {
            if (item[1]) count++;
        });
        return count;
    }
    let stats = Object.keys(props.stats).map((key)=> <p key={key}>Question {props.stats[key][0]}: {props.stats[key][1] ? "correct" : "incorrect"}</p>);
    let correctNumber = getCorrectNumber();
    let total = props.stats.length;
    const finalStats = (<React.Fragment>{stats}{correctNumber}/{total}</React.Fragment> );
    const error = (<React.Fragment><Error error="There are no stats available."/></React.Fragment>);
    let renderContents = stats.length > 0 ? finalStats : error;
    return (
        <React.Fragment>{renderContents}</React.Fragment>
    )
}

export default Finish;