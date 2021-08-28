import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import movieService from '../../services/movieService';
import './style.css';
import { Link, useHistory } from 'react-router-dom';

function Home() {
    const [movies, setMovies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(4);
    const history = useHistory();

    const uploadMovie = () => {
        try {
            history.push('/createMovie');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event: any, value: any) => {
        setCurrentPage(value);
        const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
    };

    const fetchMovieList = async () => {
        try {
            const data = await movieService.getAllMovie();
            setMovies(data);
        } catch (error) {
            console.log(error);
        }
    };

    // Get current posts
    const indexOfLastMovie: any = currentPage * moviesPerPage;
    const indexOfFirstMovie: any = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    useEffect(() => {
        fetchMovieList();
    }, []);

    return (
        <div className="home">
            <div className="home_header">
                <img
                    src="https://www.nicepng.com/png/detail/436-4369539_movie-logo-film.png"
                    alt=""
                />
                <button onClick={uploadMovie}>Upload Movie</button>
            </div>
            <div className="home_feed">
                {currentMovies.map(movie => {
                    return (
                        <Link
                            to={`/movie/${movie._id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="home_body">
                                <div className="home_img">
                                    <img
                                        width="240"
                                        height="135"
                                        src={movie.imageUrl}
                                        alt=""
                                    />
                                </div>

                                <div className="home_description">
                                    <p className="home_description_p">
                                        {movie.name}
                                    </p>

                                    <h3>{movie.releaseYear}</h3>

                                    <p>{movie.language}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
                <div className="home_footer">
                    <p>Page:{currentPage}</p>
                    <Pagination
                        count={10}
                        page={currentPage}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
