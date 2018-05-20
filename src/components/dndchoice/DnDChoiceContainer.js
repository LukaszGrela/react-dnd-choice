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

    renderDragItems = (list, locked) =>
        list.map(dragitem => <DnDChoiceDragItem
            locked={locked}
            id={dragitem.label}
            key={dragitem.label}
            {...dragitem} />);

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
                            this.renderDragItems(animals, locked)
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
                            this.renderDragItems(sports, locked)
                        }
                    </DnDChoiceDropZone>
                </div>
            </div>
        );
    }
}
DnDChoiceContainer.propTypes = {
    locked: PropTypes.bool.isRequired,
    dropzones: PropTypes.array,
    dragitems: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        dropzone: PropTypes.string,
    })).isRequired
}

export default DragDropContext(HTML5Backend)(DnDChoiceContainer);