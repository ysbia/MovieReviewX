<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { IMovie } from "@/types/interfaces";
const props = defineProps({
  movie: {
    type: Object as () => IMovie,
    required: true,
  },
});

const localMovie = ref(props.movie);
const emit = defineEmits(["on-show-details", "on-change-rating"]);


watch(()=> localMovie.value.avg_grade, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('on-change-rating')
  }
});

const showDetailsPage = (id: number) => {
  emit('on-show-details', id)
};
</script>

<template>
  <v-card :title="localMovie.title" :text="localMovie.description" @click="showDetailsPage(localMovie.id)">
  </v-card>
</template>

<style lang="scss" scoped></style>
