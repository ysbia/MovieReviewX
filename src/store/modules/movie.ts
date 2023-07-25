import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { getMovies, updateMovie } from "@/services/movies";
import { IMovie } from "@/types/interfaces"; // Assume you have defined this UserProfile interface in your types
@Module({ namespaced: true })
class MovieModule extends VuexModule {
  public movies: IMovie[] | null = [];
  public movie: IMovie | null = null;

  @Mutation
  private SET_MOVIES(movies: IMovie[]) {
    this.movies = movies;
  }
  @Mutation
  private SET_MOVIE(movie: IMovie) {
    this.movie = movie;
  }

  @Action({rawError: true})
  public async chooseMovie(payload: IMovie) {
    this.context.commit("SET_MOVIE", payload);
  }
  @Action({rawError: true})
  public async fetchMovies(payload?: any) {
    const response = await getMovies(payload.page);
    this.context.commit("SET_MOVIES", response.data);
  }
  @Action({rawError: true})
  public async updateMovie(payload: any) {
    const response = await updateMovie(payload);
    this.context.dispatch("fetchMovies", {page: 1});
    console.log("🚀 ~ file: movie.ts:30 ~ MovieModule ~ updateMovie ~ response:", response)
  }

  get getMovies() {
    return this.movies;
  }
  get getMovie() {
    return this.movie;
  }
}

export default MovieModule;
