import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconCross from '../icons/IconCross';

import './styles/Panel.scss';

class Panel extends Component {

    componentDidMount = () => {
        const body = document.getElementsByTagName('body')[0];
        // append 'modal' to body
        body.classList.add('modal');
    }
    componentWillUnmount = () => {
        const body = document.getElementsByTagName('body')[0];
        // remove 'modal' from body
        body.classList.remove('modal');
    }


    dismissPanel = () => {
        this.props.handlePanelDismiss && this.props.handlePanelDismiss();
    }

    render = () => {
        return (
            <div className='panel'>
                <div className='cloak'
                    onClick={this.dismissPanel}></div>
                <div className='panel-content card'>
                    <button className='close'
                        onClick={this.dismissPanel}><IconCross /></button>
                    {this.props.children}</div>
            </div >
        );
    }
}
Panel.propTypes = {
    children: PropTypes.node.isRequired,
    handlePanelDismiss: PropTypes.func.isRequired
}
export default Panel;