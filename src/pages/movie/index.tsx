import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import movieService from '../../services/movieService';
import './style.css';

function Movie() {
    const [movie, setMovie] = useState({
        name: '',
        releaseYear: '',
        language: '',
        imageUrl: '',
        videoUrl: '',
    });

    const fetchMovie = async (id: any) => {
        try {
            const data = await movieService.getMovie(id);
            console.log(data);
            setMovie(data);
        } catch (error) {
            console.log(error);
        }
    };

    const { id }: any = useParams();

    useEffect(() => {
        fetchMovie(id);
    }, []);

    return (
        <div className="movie">
            <div className="movie_body">
                <ReactPlayer
                    className="movie_video"
                    width="100vw"
                    height="100vh"
                    url={movie.videoUrl}
                />
            </div>
        </div>
    );
}

export default Movie;
