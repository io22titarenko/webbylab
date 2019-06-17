import React from 'react';
import {NavLink} from 'react-router-dom';

const FilmList = (props) => {
    return (
        <div className='list'>
            {props.films.map((elm)=>
            <div className='list_itm'>
                <NavLink onClick={() => props.getFilmById(elm.id)} to={`/${elm.id}`}>
                    {elm.title}
                </NavLink>
            </div>    
            )}
        </div>
    )
}

export default FilmList