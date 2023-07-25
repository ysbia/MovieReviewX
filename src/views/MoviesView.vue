<script lang="ts" setup>
import { computed, onBeforeMount, watch } from "vue";
import { ref } from "vue";
import { useStore } from "vuex";
import singleMovie from "@/components/specific/SingleMovie.vue";
import Movie from "@/store/models/Movie";
import Actor from "@/store/models/Actor";
import { useRouter } from 'vue-router';
import { IMovie } from "@/types/interfaces";

const router = useRouter();
const isShowModal = ref(false);
const loadedPage = ref(1);

const showModal = () => {
  isShowModal.value = !isShowModal.value;
};

const store = useStore();

const fetchMovies = (item?: number) => store.dispatch("MovieModule/fetchMovies", { page: item });
const fetchActors = () => store.dispatch("ActorModule/fetchActors");

onBeforeMount(async () => {
  fetchMovies();
  fetchActors();
});

const perPage = 5;

const movies = computed(() => {
  console.log("🚀 ~ file: MoviesView.vue:31 ~ movies ~ store.getters", store.getters["MovieModule/getMovies"])
  return store.getters["MovieModule/getMovies"];
});

const pages = computed(() => {
  return Math.round(movies.value.count/perPage);
});

const onShowDetails = (movie: IMovie) => {
  store.dispatch("MovieModule/chooseMovie", movie);
  router.push("/movies/"+movie.id);
};

watch(loadedPage, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    fetchMovies(loadedPage.value);
  }
});


//rating

</script>
<template>
  <v-container>
    <div class="cards">
      <single-movie v-for="movie in movies.results" :key="movie.id" :movie="movie" @on-show-details="onShowDetails(movie)" @on-change-rating="onChangeRating"></single-movie>
    </div>
    <v-pagination :length="pages" v-model="loadedPage"></v-pagination>
  </v-container>
</template>
<style scoped>
.cards {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}
</style>
