import { createStore } from "vuex";
import VuexORM from "@vuex-orm/core";
import Actor from "./models/Actor";
import Movie from "./models/Movie";
import ActorModule from "./modules/actor";
import MovieModule from "./modules/movie";
import ReviewModule from "./modules/review";
import createPersistedState from 'vuex-persistedstate'
const database = new VuexORM.Database();

// Register Models to Database.
database.register(Actor);
database.register(Movie);
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {MovieModule, ActorModule, ReviewModule},
  plugins: [VuexORM.install(database),createPersistedState()],
});
