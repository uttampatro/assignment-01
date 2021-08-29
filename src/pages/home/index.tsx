import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import movieService from '../../services/movieService';
import './style.css';
import { Link, useHistory } from 'react-router-dom';

function Home() {
    const [movies, setMovies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [moviesPerPage, setMoviesPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const history = useHistory();

    const uploadMovie = () => {
        try {
            history.push('/createMovie');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangePage = (event: any, value: any) => {
        setCurrentPage(value);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setMoviesPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const fetchMovieList = async () => {
        try {
            const result = await movieService.getAllMovie({
                page: currentPage + 1,
                limit: moviesPerPage,
            });
            setMovies(result.movieList);
            setTotalCount(result.pagination.count);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovieList();
    }, [currentPage, moviesPerPage]);

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
                {movies.map(movie => {
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
                    <TablePagination
                        count={totalCount}
                        page={currentPage}
                        onPageChange={handleChangePage}
                        rowsPerPage={moviesPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
