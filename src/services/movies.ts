import { AxiosResponse } from "axios";
import instance from "./instance";

const getMovies = async (page = 1): Promise<AxiosResponse> => instance.get("/movies/?page="+page);
const updateMovie = async (body: any): Promise<AxiosResponse> => instance.post("/movies/",body);

export { getMovies, updateMovie };
