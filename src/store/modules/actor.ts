import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { getActors } from "@/services";
import { IActor } from "@/types/interfaces"; // Assume you have defined this UserProfile interface in your types
@Module({ namespaced: true })
class ActorModule extends VuexModule {
  public actors: IActor[] | null = [];

  @Mutation
  private SET_ACTORS(actors: IActor[]) {
    this.actors = actors;
  }

  @Action
  public async fetchActors() {
    const response = await getActors();
    this.context.commit("SET_ACTORS", response.data);
  }

  get getActors() {
    return this.actors;
  }
}

export default ActorModule;
