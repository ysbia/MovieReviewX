import { Model } from "@vuex-orm/core";
import Actor from "./Actor";

export default class Movie extends Model {
  static entity = "movies";

  // `this.belongsTo` is for belongs to relationship. The first argument is
  // the Model class, and second is the field name for the foreign key.
  static fields() {
    return {
      id: this.attr(null),
    };
  }
  static relations() {
    return {
      actors: this.belongsToMany(Actor, "actors", "id", "actors"),
    };
  }
}
