import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import DnDChoiceDropZone from './DnDChoiceDropZone';
import DnDChoiceDragItem from './DnDChoiceDragItem';

import './styles/DnDChoiceContainer.scss'
import { tenantsSelector, nextDragItemSelector } from './selectors';

class DnDChoiceContainer extends React.Component {

    handleDrop = (dropzoneId, item) => {
        this.props.handleItemDropped(item, dropzoneId)
    }

    render = () => {
        const { dragitems } = this.props;
        const next = nextDragItemSelector(dragitems);
        const animals = tenantsSelector(dragitems, 'animals');
        const sports = tenantsSelector(dragitems, 'sports');

        return (
            <div className='dnd-choice container'>
                <div className='dnd-dropzones'>
                    <DnDChoiceDropZone
                        id={'animals'}
                        onDrop={this.handleDrop} >
                        {
                            animals.map(dragitem => <DnDChoiceDragItem
                                id={dragitem.label}
                                key={dragitem.label}
                                {...dragitem} />)
                        }
                    </DnDChoiceDropZone>
                    <div className='dnd-dragitems'>
                        {
                            next &&
                            <DnDChoiceDragItem
                                id={next.label}
                                {...next} />
                        }
                    </div>
                    <DnDChoiceDropZone
                        id={'sports'}
                        onDrop={this.handleDrop}>
                        {
                            sports.map(dragitem => <DnDChoiceDragItem
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


export default DragDropContext(HTML5Backend)(DnDChoiceContainer);