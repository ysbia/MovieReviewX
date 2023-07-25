import { AxiosResponse } from "axios";
import instance from "./instance";
import { IReview } from "@/types/interfaces";

const getReviews = async (): Promise<AxiosResponse> => instance.get("/reviews");
const updateRating = async (body:IReview): Promise<AxiosResponse> => instance.post("/reviews/",body);

export { getReviews, updateRating };