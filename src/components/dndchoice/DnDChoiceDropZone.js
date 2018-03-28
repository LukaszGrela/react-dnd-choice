import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from './ItemTypes';


import './styles/DnDChoiceDropZone.scss'

class DnDChoiceDropZone extends Component {
    render = () => {
        const { connectDropTarget, id, children, locked } = this.props;
        return connectDropTarget(
            <div className={'drop-zone' + (locked ? ' locked' : '')}>
                <div className='heading'>{id}</div>
                <div className='slots'>
                    {children}
                </div>
            </div>
        );
    }
};
DnDChoiceDropZone.propTypes = {
    id: PropTypes.string.isRequired,
    onDrop: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
};

const dropZoneTarget = {
    canDrop: (props, monitor) => {
        return true;
    },
    drop: (props, monitor) => {
        props.onDrop(props.id, monitor.getItem())
    }
};
const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
})
export default DropTarget(ItemTypes.LABEL,
    dropZoneTarget,
    collect)(DnDChoiceDropZone);