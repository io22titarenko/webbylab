import React, {Component} from 'react';
import axios from 'axios';

class NewFilm extends Component{
    state= {
        title: '',
        year: '',
        format: '',
        stars: [],
        errorMessage:null
    }
    
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onFormatChange = (e) => {
        this.setState({format: e.target.value})
    }

    onStarsChange = (e) => {
        this.setState({stars: e.target.value.split(', ')})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/film`, {...this.state})
        .then((res)=>{
        this.props.getAllFilms();
        this.setState({
            title: '',
            year: '',
            format: '',
            stars: []
        })
        })
        .catch(error=>{
            this.setState({errorMessage: error.response.data.message, title: '',
            year: '',
            format: '',
            stars: []})
        });

    }

    render() {
        return(
            <div className='new_film'>
                <div>
                <div>
                    <label>Title</label>
                    <input name="title" type="text" onChange={this.onChange} placeholder="The Lion King" value={this.state.title}/>
                </div>
                <div>
                    <label>Year</label>
                    <input name='year' type="text" onChange={this.onChange} placeholder="1994" value={this.state.year}/>
                </div>
                <div>
                    <label>Format</label>
                    <select value={this.state.format} onChange={this.onFormatChange}>
                    <option></option>
                    <option value="DVD">DVD</option>
                    <option value="Blu-Ray">Blu-Ray</option>
                    <option value="VHS">VHS</option>
                </select>
                </div>
                <div>
                    <label>Stars</label>
                    <textarea onChange={this.onStarsChange} value={this.state.stars.join(', ')}/>
                </div>
                <button onClick={this.handleSubmit}>Submit</button></div>
                <div><span>{this.state.errorMessage}</span></div>
            </div>
        )
    }
}

export default NewFilm;