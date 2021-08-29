import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import './style.css';
import 'react-circular-progressbar/dist/styles.css';
import movieService from '../../services/movieService';
import { useHistory } from 'react-router-dom';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function CreateMovie() {
    const classes = useStyles();
    const history = useHistory();
    const [movie, setMovie] = useState<{
        name: string;
        releaseYear: string;
        language: string;
        imageUrl: string;
        videoUrl: string;
        previewImage: string;
        imageFile: File | null;
        videFile: File | null;
    }>({
        name: '',
        releaseYear: '',
        language: '',
        imageUrl: '',
        videoUrl: '',
        previewImage: '',
        imageFile: null,
        videFile: null,
    });
    const [isCreatingMovie, setIsCreatingMovie] = useState(false);

    const createMovie = async (e: any) => {
        e.preventDefault();
        try {
            setIsCreatingMovie(true);
            const { name, releaseYear, language, imageFile, videFile } = movie;

            if (!imageFile) {
                return alert('please upload movie thumbnail');
            }

            if (!videFile) {
                return alert('please upload movie video');
            }

            const imageUrl = await uploadThumbnail(imageFile);
            const videoUrl = await uploadMovie(videFile);

            await movieService.createMovie({
                name,
                releaseYear,
                language,
                imageUrl,
                videoUrl,
            });
            setIsCreatingMovie(false);
            alert('movie created successfully');
            history.push('/home');
        } catch (error) {
            setIsCreatingMovie(false);
            console.log(error);
            alert(JSON.stringify(error));
        }
    };

    const uploadThumbnail = async (imageFile: File) => {
        const awsSignedUrlRes = await movieService.generateSignedUrl(
            imageFile?.name
        );
        const thumbnailSignedUrl = awsSignedUrlRes.signedRequest;
        const imageUrl = awsSignedUrlRes.url;
        await movieService.uploadFile(thumbnailSignedUrl, imageFile);
        return imageUrl;
    };

    const uploadMovie = async (videoFile: File) => {
        const awsSignedUrlRes = await movieService.generateSignedUrl(
            videoFile?.name
        );
        const movieSignedUrl = awsSignedUrlRes.signedRequest;
        const videoUrl = awsSignedUrlRes.url;
        await movieService.uploadFile(movieSignedUrl, videoFile);
        return videoUrl;
    };

    const onInputChange = (e: any) => {
        if (e.target.name === 'thumbnail') {
            setMovie(prev => {
                return {
                    ...prev,
                    previewImage: URL.createObjectURL(e.target.files[0]),
                    imageFile: e.target.files[0],
                };
            });
        }
        if (e.target.name === 'video') {
            setMovie(prev => {
                return {
                    ...prev,
                    videFile: e.target.files[0],
                };
            });
        } else {
            // Name, Release year and language
            setMovie(prev => {
                return { ...prev, [e.target.name]: e.target.value };
            });
        }
    };

    return (
        <div className="createMovie">
            <form className="createMovie_form">
                <h3>Upload Movie</h3>
                <div className="createMovie_group">
                    <label>Name</label>
                    <input
                        className="createMovie_input"
                        placeholder="Name"
                        type="text"
                        name="name"
                        required
                        value={movie.name}
                        onChange={onInputChange}
                    />
                </div>
                <div className="createMovie_middle">
                    <div className="createMovie_middle_group">
                        <label>Year Of Release</label>
                        <input
                            className="createMovie_middle_input"
                            placeholder="Year Of Release"
                            type="number"
                            required
                            name="releaseYear"
                            value={movie.releaseYear}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="createMovie_middle_group">
                        <label>Language</label>
                        <input
                            className="createMovie_middle_input"
                            placeholder="Language"
                            type="text"
                            required
                            name="language"
                            value={movie.language}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                <div className="createMovie_group">
                    <label>Thumbnail</label>
                    <div className="createMovieThumbnail_group">
                        <input
                            accept="image/png,image/jpg"
                            className="createMovieThumbnail_input"
                            type="file"
                            style={{ paddingBottom: '20px' }}
                            required
                            name="thumbnail"
                            onChange={onInputChange}
                        />
                        {movie.previewImage && (
                            <img
                                src={movie.previewImage}
                                height={50}
                                width={50}
                            />
                        )}
                    </div>
                </div>

                <div className="createMovie_group">
                    <label>Video FIle</label>
                    <input
                        accept="video/*"
                        className="createMovieThumbnail_input"
                        type="file"
                        required
                        name="video"
                        style={{ paddingBottom: '10px' }}
                        onChange={onInputChange}
                    />
                </div>
                <div className="createMovie_group_button">
                    <Button
                        variant="contained"
                        disabled={isCreatingMovie}
                        color="primary"
                        href="#contained-buttons"
                        onClick={createMovie}
                        style={{ width: '100%' }}
                    >
                        Save
                    </Button>
                    {isCreatingMovie && (
                        <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}

export default CreateMovie;
