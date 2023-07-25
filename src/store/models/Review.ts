import { Model } from "@vuex-orm/core";
import Movie from "./Movie";

export default class Review extends Model {
  static entity = "movies";

  // `this.belongsTo` is for belongs to relationship. The first argument is
  // the Model class, and second is the field name for the foreign key.
  static fields() {
    return {
      id: this.attr(null),
      grade: this.attr(null),
      movie: this.attr(null),
    };
  }
  static relations() {
    return {
        movie: this.belongsTo(Movie, "movie"),
    };
  }
}
