import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Avatar } from 'evergreen-ui'
import ReactHintFactory from 'react-hint'

const ReactHint = ReactHintFactory(React)

function PersonsRow(props) {
    return (
        <Pane
            display="flex"
            height={100}
            width="100%"
            float="left"
            padding={16}
            borderRadius={5}
            background="rgba(0, 0, 0, 0.3)">
            <Pane
                float="left"
                display="flex"
                flex={1}
                justifyContent="left"
                alignItems="center"
                flexDirection="row">
                {props.other_persons.map(function (person, index) {
                    return <div key={index}>
                        <ReactHint autoPosition events />
                        <Avatar
                            name={person.username}
                            size={80}
                            data-rh={person.username + ", " + person.first_name}
                            marginRight={16}
                            isSolid={(props.persons_query[props.current_person - 1].username === person.username) ? true : false}
                            onClick={(e) => props.showOtherPerson(e)}
                        />
                    </div>
                }, this)}
            </Pane>
        </Pane>
    );
}

PersonsRow.propTypes = {
    other_persons: PropTypes.array.isRequired,
    persons_query: PropTypes.array.isRequired,
    current_person: PropTypes.number.isRequired,
    showOtherPerson: PropTypes.func.isRequired
}

export default PersonsRow;