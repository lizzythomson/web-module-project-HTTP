import React, { useEffect, useState } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm';
import MovieHeader from './components/MovieHeader';
import AddMovieForm from './components/AddMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9000/api/movies')
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    const newMovies = movies.filter((movie) => {
      return movie.id !== id;
    });
    setMovies(newMovies);
  };

  const addToFavorites = (movie) => {};

  return (
    <div>
      <nav className='navbar navbar-dark bg-dark'>
        <span className='navbar-brand'> HTTP / CRUD Module Project</span>
      </nav>

      <div className='container'>
        <MovieHeader />
        <div className='row '>
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path='/movies/edit/:id'>
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route path='/movies/add'>
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path='/movies/:id'>
              <Movie deleteMovie={deleteMovie} />
            </Route>

            <Route path='/movies'>
              <MovieList movies={movies} />
            </Route>

            <Route path='/'>
              <Redirect to='/movies' />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
