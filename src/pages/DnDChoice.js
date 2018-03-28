import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DnDChoiceContainer from '../components/dndchoice/DnDChoiceContainer';
import { dragItemSelector, dragItemIndexSelector, nextDragItemSelector } from '../components/dndchoice/selectors';

import './styles/DnDChoice.scss';
import Panel from '../components/Panel';

class DnDChoice extends React.Component {
    state = {
        title: 'Drag and Drop Choice #1',
        tutorialText: 'This template is set to unlock submit when all drag items are in drop zones. Two attempts, first is generic. Correctly placed drag items are not removed on attempt reset.',
        instructions: {
            initial: 'Drag each example to the correct category area then select <b>Submit</b>.',
            final: 'Select <b>Next</b> to continue.'
        },
        finished: false,
        complete: false,
        validating: false,
        showFeedback: false,
        feedback: {
            correct: {
                title: 'Correct',
                message: 'Yes, that\'s right.'
            },
            incorrect: {
                title: 'Incorrect',
                message: 'No, that\'s not right.'
            },
        },
        activity: {
            dropzones: {
                'sports': [],
                'animals': []
            },
            dragitems: [
                {
                    label: 'cricket',
                    dropzone: null
                },
                {
                    label: 'lion',
                    dropzone: null
                },
                {
                    label: 'dolphin',
                    dropzone: null
                },
                {
                    label: 'football',
                    dropzone: null
                },
                {
                    label: 'horse',
                    dropzone: null
                },
                {
                    label: 'lynx',
                    dropzone: null
                },
            ]
        }
    };

    handleItemDropped = ({ id: tenantId, dropzoneId: prevDropzoneId }, dropzoneId) => {

        console.log('handleItemDropped()', tenantId, dropzoneId, prevDropzoneId);
        if (dropzoneId !== null && dropzoneId === prevDropzoneId) return;
        this.setState(prevState => {
            const { dropzones, dragitems } = prevState.activity;
            let newDropzones = { ...dropzones };
            let index, prevDropZones;
            if (prevDropzoneId !== null) {
                prevDropZones = [...newDropzones[prevDropzoneId]];
                index = prevDropZones.findIndex(id => id === tenantId);
                if (index >= 0) {
                    prevDropZones.splice(index, 1);
                    newDropzones[prevDropzoneId] = prevDropZones
                }
            }
            index = newDropzones[dropzoneId].findIndex(id => id === tenantId);
            if (index === -1) {
                newDropzones[dropzoneId].push(tenantId);
            }


            const dragitem = dragItemSelector(dragitems, tenantId);
            index = dragItemIndexSelector(dragitems, tenantId);

            const newDragItem = { ...dragitem, dropzone: dropzoneId };
            const newDragitems = [...dragitems];
            newDragitems[index] = newDragItem;

            return {
                activity: {
                    ...prevState.activity,
                    dropzones: newDropzones,
                    dragitems: newDragitems
                }
            }
        }, _ => {
            const { dragitems } = this.state.activity;
            const next = nextDragItemSelector(dragitems);
            console.log("next", next);
            if (next === undefined) {
                this.checkInteractionFinished();
            }
        })
    }
    checkInteractionFinished = () => {
        console.log('checkInteractionFinished()');
        this.setState(prevState => ({
            finished: true
        }));
    }
    handleSubmit = () => {
        this.setState(prevState => {
            return {
                complete: true,
                validating: true
            }
        }, _ => {
            /* some sort of remote validation of answer */
            setTimeout(() => {
                const { dropzones, feedback } = this.state.activity;
                const correctAnswer = {
                    'sports': 'cricket,football',
                    'animals': 'dolphin,horse,lion,lynx'
                };
                let correct = undefined;
                for (const dropzone in dropzones) {
                    if (dropzones.hasOwnProperty(dropzone)) {
                        const answer = dropzones[dropzone].sort().join();
                        console.log("compare", answer, correctAnswer[dropzone]);
                        if (correct === undefined || correct === true) correct = answer === correctAnswer[dropzone];
                    }
                }
                this.setState(prevState => ({
                    result: correct,
                    validating: false,
                    showFeedback: true
                }));

            }, 250);
        });
    }
    closeFeedback = () => {
        this.setState(prevState => ({
            showFeedback: false
        }));
    }
    openFeedback = () => {
        this.setState(prevState => ({
            showFeedback: true
        }));
    }
    render = () => {
        const {
            title,
            tutorialText,
            instructions,
            finished,
            complete,
            activity,
            feedback,
            result,
            showFeedback } = this.state;
        const instruction = finished && complete ? instructions.final : instructions.initial;
        const fb = result ? feedback.correct : feedback.incorrect;
        return (
            <article className='page dndchoice-page'>
                <header className='slide_heading'>
                    <h1 className='title'>{title}</h1>
                </header>
                <div className='tutorial-text'>{tutorialText}</div>
                <DnDChoiceContainer
                    dropzones={activity.dropzones}
                    dragitems={activity.dragitems}
                    locked={complete}
                    handleItemDropped={this.handleItemDropped}
                />
                {(result != undefined && showFeedback) &&
                    <Panel handlePanelDismiss={this.closeFeedback}>
                        <div className={'feedback' + (result ? ' correct' : ' incorrect')}>
                            <div className='feedback-title'>{fb.title}</div>
                            <div className='feedback-body'>{fb.message}</div>
                        </div>
                    </Panel>
                }
                {finished &&
                    <div className='activity-buttons'>
                        {!complete &&
                            <button
                                className='btn submit'
                                disabled={complete}
                                onClick={
                                    this.handleSubmit
                                }>Submit</button>}
                    </div>
                }
                <div className='instruction-text' dangerouslySetInnerHTML={{ __html: instruction }} />
                <footer><nav><NavLink to='/'>Next &gt;</NavLink></nav></footer>
            </article>
        );
    }
};

const mapStateToProps = (state, props) => ({

});
const mapDispatchToProps = (dispatch, props) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DnDChoice);