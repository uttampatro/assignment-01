import axios from './axiox';
import * as config from '../config/api';

export interface IMovieService {
    createMovie(dto: {
        name: string;
        releaseYear: string;
        language: string;
        imageUrl: string;
        videoUrl: string;
    }): Promise<any[]>;
    getAllMovie(dto: { page: number; limit: number }): Promise<any[]>;
    getMovie(id: any): Promise<any[]>;
}

export class MovieService implements IMovieService {
    async createMovie(dto: {
        name: string;
        releaseYear: string;
        language: string;
        imageUrl: string;
        videoUrl: string;
    }): Promise<any[]> {
        const { name, releaseYear, language, imageUrl, videoUrl } = dto;
        try {
            const response = await axios.post(
                `${config.apiConfig.baseUrl}/v1/createMovie`,
                {
                    name,
                    releaseYear,
                    language,
                    imageUrl,
                    videoUrl,
                }
            );
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    async getAllMovie(dto: { page: number; limit: number }): Promise<any> {
        try {
            const response = await axios.get(
                `${config.apiConfig.baseUrl}/v1/getMovieList?page=${dto.page}&limit=${dto.limit}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    async getMovie(id: any): Promise<any> {
        try {
            const response = await axios.get(
                `${config.apiConfig.baseUrl}/v1/getMovie/${id}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async generateSignedUrl(fileName: string): Promise<any> {
        try {
            const response = await axios.get(
                `${config.apiConfig.baseUrl}/v1/sign-url?filename=${fileName}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async uploadFile(signedUrl: string, file: File): Promise<any> {
        try {
            await axios.put(signedUrl, file);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MovieService();
