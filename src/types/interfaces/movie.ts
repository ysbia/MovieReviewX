import { IActor } from "./actor";
export interface IMovie {
  id: number;
  title: string;
  description: string;
  actors: IActor[];
  avg_grade: number;
}
