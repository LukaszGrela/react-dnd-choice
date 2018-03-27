import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render = () => {
        return (
            <article>
                <h1>Drag and Drop activity - DnD Choice</h1>
                <Link to='/dndchoice'>Open DnD Choice</Link>
            </article>
        );
    }
};
export default Home;