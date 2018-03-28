import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import DnDChoiceDropZone from './DnDChoiceDropZone';
import DnDChoiceDragItem from './DnDChoiceDragItem';

import './styles/DnDChoiceContainer.scss'
import { tenantsSelector, nextDragItemSelector } from './selectors';

class DnDChoiceContainer extends React.Component {

    handleDrop = (dropzoneId, item) => {
        this.props.handleItemDropped(item, dropzoneId)
    }

    render = () => {
        const { dragitems, locked } = this.props;
        const next = nextDragItemSelector(dragitems);
        const animals = tenantsSelector(dragitems, 'animals');
        const sports = tenantsSelector(dragitems, 'sports');

        return (
            <div className='dnd-choice container'>
                <div className='dnd-dropzones'>
                    <DnDChoiceDropZone
                        id={'animals'}
                        locked={locked}
                        onDrop={this.handleDrop} >
                        {
                            animals.map(dragitem => <DnDChoiceDragItem
                                locked={locked}
                                id={dragitem.label}
                                key={dragitem.label}
                                {...dragitem} />)
                        }
                    </DnDChoiceDropZone>
                    <div className='dnd-dragitems'>
                        {
                            next &&
                            <DnDChoiceDragItem
                                locked={locked}
                                id={next.label}
                                {...next} />
                        }
                    </div>
                    <DnDChoiceDropZone
                        id={'sports'}
                        locked={locked}
                        onDrop={this.handleDrop}>
                        {
                            sports.map(dragitem => <DnDChoiceDragItem
                                locked={locked}
                                id={dragitem.label}
                                key={dragitem.label}
                                {...dragitem} />)
                        }
                    </DnDChoiceDropZone>
                </div>
            </div>
        );
    }
}
DnDChoiceContainer.propTypes = {
    locked: PropTypes.bool.isRequired
}

export default DragDropContext(HTML5Backend)(DnDChoiceContainer);