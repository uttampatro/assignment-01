import axios from './axiox';
import * as config from './../config/api';

export interface IMovieService {
    createCourse(
        name: string,
        releaseYear: string,
        language: string,
        imageUrl: string,
        videoUrl: string
    ): Promise<any[]>;
    getAllMovie(): Promise<any[]>;
    getMovie(id: any): Promise<any[]>;
}

export class MovieService implements IMovieService {
    async createCourse(
        name: string,
        releaseYear: string,
        language: string,
        imageUrl: string,
        videoUrl: string
    ): Promise<any[]> {
        try {
            console.log(config.apiConfig.baseUrl);
            const response = await axios.post(
                `${config.apiConfig.baseUrl}/createMovie`,
                {
                    name,
                    releaseYear,
                    language,
                    imageUrl,
                    videoUrl,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async getAllMovie(): Promise<any> {
        try {
            const response = await axios.get(
                `${config.apiConfig.baseUrl}/getMovieList`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async getMovie(id: any): Promise<any> {
        try {
            const response = await axios.get(
                `${config.apiConfig.baseUrl}/getMovie/${id}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MovieService();
