import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IReview } from "@/types/interfaces"; 
import { updateRating } from "@/services/reviews";
@Module({ namespaced: true })
class ReviewModule extends VuexModule {

  @Action
  public async updateRating(body: IReview) {
    console.log("🚀 ~ file: review.ts:9 ~ ReviewModule ~ updateRating ~ body:", body)
    const response = await updateRating(body);
  }

}

export default ReviewModule;
