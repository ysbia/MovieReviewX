import { AxiosResponse } from "axios";
import instance from "./instance";

const getActors = async (): Promise<AxiosResponse> => instance.get("/actors");

export { getActors };