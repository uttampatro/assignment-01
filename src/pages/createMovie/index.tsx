import { Button, CircularProgress, LinearProgress } from '@material-ui/core';
import React, { useState } from 'react';
import './style.css';
import 'react-circular-progressbar/dist/styles.css';
import movieService from '../../services/movieService';
import Dropzone from 'react-dropzone-uploader';
import { useHistory } from 'react-router-dom';

function CreateMovie() {
    const [name, setName] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [language, setLanguage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [videoProgress, setVideoProgress] = useState(0);
    const history = useHistory();

    const save = async () => {
        try {
            const response = await movieService.createCourse(
                name,
                releaseYear,
                language,
                imageUrl,
                videoUrl
            );
        } catch (error) {
            console.log(error);
        }
    };

    const setThumbnailTime = () => {
        const timer: any = setInterval(() => {
            setProgress((oldProgress: any) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    };

    const setVideoTime = () => {
        const timer: any = setInterval(() => {
            setVideoProgress((oldProgress: any) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
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
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="createMovie_middle">
                    <div className="createMovie_middle_group">
                        <label>Year Of Release</label>
                        <input
                            className="createMovie_middle_input"
                            placeholder="Year Of Release"
                            type="text"
                            required
                            value={releaseYear}
                            onChange={e => setReleaseYear(e.target.value)}
                        />
                    </div>
                    <div className="createMovie_middle_group">
                        <label>Language</label>
                        <input
                            className="createMovie_middle_input"
                            placeholder="Language"
                            type="text"
                            required
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                        />
                    </div>
                </div>

                <div className="createMovie_group">
                    <label>Thumbnail</label>
                    <div className="createMovieThumbnail_group">
                        <input
                            accept="image/*"
                            onClick={setThumbnailTime}
                            className="createMovieThumbnail_input"
                            type="file"
                            required
                            placeholder="Language"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        />
                    </div>
                    <LinearProgress
                        className="LinearProgress"
                        variant="determinate"
                        value={progress}
                    />
                </div>

                <div className="createMovie_group">
                    <label>Video FIle</label>
                    <input
                        accept="video/*"
                        onClick={setVideoTime}
                        className="createMovieThumbnail_input"
                        type="file"
                        required
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                    />
                    <LinearProgress
                        className="LinearProgress"
                        variant="determinate"
                        value={videoProgress}
                    />
                    {/* <Dropzone
                        // getUploadParams={() => ({
                        //     url: 'https://httpbin.org/post',
                        // })} 
                        // onChangeStatus={({ meta, file }, status) => {
                        //     console.log(status, meta, file);
                        // }}
                        // onSubmit={files => {
                        //     // console.log(files.map(f => f.meta));
                        // }}
                        accept="image/*,audio/*,video/*"
                        
                    /> */}
                </div>

                <button onClick={save} className="createMovie_button">
                    Save
                </button>
            </form>
        </div>
    );
}

export default CreateMovie;
