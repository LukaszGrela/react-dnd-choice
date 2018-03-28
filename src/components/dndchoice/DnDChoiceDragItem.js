import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import './styles/DnDChoiceDragItem.scss'

class DnDChoiceDragItem extends React.Component {
    render = () => {
        const { id, connectDragSource, isDragging } = this.props;
        const opacity = isDragging ? 0 : 1
        return connectDragSource(
            <div className='drag-item' style={{ opacity }}>{id}</div>
        )
    }
}
DnDChoiceDragItem.propTypes = {
    id: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
};
const dragSource = {
    beginDrag: (props) => {
        console.log(props)
        return { id: props.id, dropzoneId: props.dropzone };
    }
}
const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})
export default DragSource(ItemTypes.LABEL, dragSource, collect)(DnDChoiceDragItem);