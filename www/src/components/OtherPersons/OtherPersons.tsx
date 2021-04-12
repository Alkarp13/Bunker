import React from 'react';
import Spinner from '../Primitives/Spinner/Spinner';
import PersonCard, { PersonInfo } from '../PersonCard/PersonCard';

const DraggableWindow = React.lazy(() => import('../DraggableWindow/DraggableWindow'));

interface Props {
    other_persons: Array<PersonInfo>;
    changeNoteHandler(text: string, username: string): void;
    hideOtherPerson(username: string): void;
}

export default class OtherPersons extends React.Component<Props> {

    render() {
        return (
            <div>
                {this.props.other_persons.map((other: PersonInfo, index: number) => {
                    if (other.is_shown) {
                        return (
                            <React.Suspense fallback={<Spinner size={32} />} >
                                <DraggableWindow
                                    key={index} title={other.first_name + ' ' + other.last_name}
                                    onClose={ () => this.props.hideOtherPerson(other.username) }
                                    onMinimize={ () => this.props.hideOtherPerson(other.username) }
                                >
                                    <PersonCard person={other} other={true} changeNoteHandler={this.props.changeNoteHandler} />
                                </DraggableWindow>
                            </React.Suspense>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
        );
    }
}