<template>
  <div class="card-container">
    <v-card class="card">
      <v-card-title
        @click="isEditMovie.title = true"
        v-if="!isEditMovie.title"
        >{{ mappedMovie.title }}</v-card-title
      >
      <v-text-field
        class="input"
        v-click-outside="outside"
        label="Title"
        v-model="editedMovie.title"
        @keyup.enter="updateMovie"
        v-else
      ></v-text-field>
      <v-card-subtitle
        @click="isEditMovie.description = true"
        v-if="!isEditMovie.description"
        >{{ mappedMovie.description }}</v-card-subtitle
      >
      <v-text-field
        class="input"
        v-click-outside="outside"
        label="Description"
        v-model="editedMovie.description"
        @keyup.enter="updateMovie"
        v-else
      ></v-text-field>
      <template v-if="!isEditMovie.actors">
        <template v-if="mappedMovie.actors.length">
          <v-card-subtitle
            class="cursor-pointer"
            @click="isEditMovie.actors = true"
            v-for="actor in mappedMovie.actors"
            :key="actor.id"
            >{{ actor.first_name }} {{ actor.last_name }}</v-card-subtitle
          >
        </template>
        <template>
          <div>This is no Actors for this Movie</div>
        </template>
      </template>
      <v-textarea
        v-click-outside="outside"
        label="Actors"
        v-model="editedMovie.actors"
        @keyup.ctrl.enter="updateMovie"
        v-else
      >
      Press ctrl + Enter to submit
      </v-textarea>
      <v-rating
        class="cursor-pointer"
        v-model="mappedMovie.avg_grade"
        bg-color="orange-lighten-1"
        color="blue"
      ></v-rating>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { IMovie } from "@/types/interfaces";
import { computed, watch, onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import vClickOutside from "v-click-outside";
import router from "@/router";

const route = useRoute();
const store = useStore();

const isEditMovie = ref({
  title: false,
  description: false,
  actors: false,
});
const editedMovie = ref({
  title: "",
  description: "",
  actors: "",
});

const fetchActors = () => store.dispatch("ActorModule/fetchActors");

onBeforeMount(async () => {
  fetchActors();
});

const actors = computed(() => {
  return store.getters["ActorModule/getActors"];
});
const movie = computed(() => {
  return store.getters["MovieModule/getMovie"];
});
//formatting movies and add actors like foreing key
let actorMap = actors.value?.results?.reduce((map, actor) => {
  map[actor.id] = actor;
  return map;
}, {});

let mappedMovie = computed(() => {
  let movie = store.getters["MovieModule/getMovie"];
  if (movie) {
    movie.actors = movie.actors.map((actorId: number) => actorMap[actorId]);
  }
  return movie;
});


editedMovie.value = {
  ...mappedMovie.value,
  actors: mappedMovie.value.actors.length
    ? mappedMovie.value.actors
        .map((obj: any) => obj.first_name + " " + obj.last_name)
        .join("\n")
    : "",
};

const updateMovie = () => {
  store.dispatch("MovieModule/updateMovie", {
    title: editedMovie.value.title,
    description: editedMovie.value.description,
    avg_grade: mappedMovie.value.avg_grade,
    actors: editedMovie.value.actors
      .split("\n")
      .map((actor: string) => actor.split(" ")[1] ?? "0"),
  });
  isEditMovie.value.title = false;
  isEditMovie.value.description = false;
  isEditMovie.value.actors = false;
  router.push("/movies");
};

const outside = () => {
  isEditMovie.value.title = false;
  isEditMovie.value.description = false;
  isEditMovie.value.actors = false;
};

watch(
  () => mappedMovie.value?.avg_grade,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      store.dispatch("ReviewModule/updateRating", {
        movie: mappedMovie.value.id,
        grade: oldVal + newVal,
      });
    }
  }
);
</script>

<style scoped>
.card-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.card {
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
}
.v-field {
  width: 100%;
  max-height: 30px !important;
}
</style>
