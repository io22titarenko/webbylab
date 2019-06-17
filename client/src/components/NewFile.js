import React from 'react';
import axios from 'axios';

class NewFile extends React.Component {

    state={
        file: undefined,
        message: null
    }  

    handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('file', this.state.file);
        axios.post('/api/film/upload', formData)
        .then((result)=>{
            this.setState({file: null,message: 'File upload success'})
            this.props.getAllFilms()
            console.log(result)
        })
        .catch(e=>{
            this.setState({file: null,message: 'File upload failure'})
        })
    } 

    handleChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            file: e.target.files[0],
        })
    }

    render() {
        return(
        <div className='file_wrapper'>
            <input type="file" onChange={this.handleChange}/>
            <button onClick={this.handleSubmit} >Submit</button>
            {<span>{this.state.message}</span>}
        </div>)
    }
}

export default NewFile;