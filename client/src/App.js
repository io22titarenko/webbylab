import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import axios from 'axios';

import NewFilm from './components/NewFilm';
import FilmList from './components/FilmList';
import Film from './components/Film';
import NewFile from './components/NewFile';

class App extends React.Component{
  state = {
    data: [],
    currentFilm: null
  }

  componentWillMount() {
    this.getAllFilms()
  }
  
  getAllFilms = () => {
   axios.get('/api/film')
    .then((res)=>{
        this.setState({ ...this.state, data:res.data})
    });
  }

getFilmById = (id) => {
  axios.get(`/api/film/${id}`)
  .then((res)=>{
    if (res.status === 200) {
      this.setState({
        ...this.state,
        currentFilm:{
          title: (res.data && res.data.title) || '',
          format: (res.data && res.data.format) || '',
          year: (res.data && res.data.year) || '',
          stars: (res.data && res.data.stars) || [],}
      })
    }
  });
}

  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <FilmList films={this.state.data}  getFilmById={this.getFilmById}/>
        <NewFilm getAllFilms={this.getAllFilms}/>
        <NewFile getAllFilms={this.getAllFilms}/>
        <div className='content_wrapper'>
          <Route path='/:id' render={(props)=><Film {...props} state={this.state.currentFilm}/>}/>
        </div>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
