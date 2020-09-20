import React from 'react';
import PropTypes from 'prop-types';
import DnR from './DnR';
import { WindowsTheme } from './themes';
import PersonCard from './PersonCard';

const paneStyle = {
    width: '300px',
    height: '550px',
    top: '30%',
    left: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
};

class OtherPersons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.other_persons.map(function (other, index) {
                    if (other.is_shown) {
                        return <DnR
                            key={index}
                            ref='dnr' {...WindowsTheme({
                                title: other.first_name + ' ' + other.last_name,
                                onClose: () => this.props.hideOtherPerson(other.username),
                                onMinimize: () => this.props.hideOtherPerson(other.username)
                            })}
                            title={other.first_name + ' ' + other.last_name}
                            style={paneStyle}>
                            <PersonCard person={other} other={true} changeNoteHandler={this.props.changeNoteHandler} />
                        </DnR>
                    } else {
                        return null;
                    }
                }, this)}
            </div>
        );
    }
}

OtherPersons.propTypes = {
    other_persons: PropTypes.array.isRequired,
    changeNoteHandler: PropTypes.func.isRequired,
    hideOtherPerson: PropTypes.func.isRequired
}

export default OtherPersons;