import React from 'react';
import axios from 'axios';

class Film  extends React.Component{

    render() {
        console.log(this.props.state)
        if (!this.props.state) return ''
        return (
        <div className='film_item'>
            <div>
                Title: {this.props.state.title}
            </div>
            <div>
                Format: {this.props.state.format}
            </div>
            <div>
                Year: {this.props.state.year}
            </div>
            <div>
                Stars: {this.props.state.stars.join(', ')}
            </div>
        </div>
    );
        }
}


export default Film;