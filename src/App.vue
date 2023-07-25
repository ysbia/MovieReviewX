<template>
  <v-app>
    <v-main>
      <v-card>
        <v-layout>
          <v-navigation-drawer class="bg-deep-purple" theme="dark" permanent>
            <v-list color="transparent">
              <v-list-item
                prepend-icon="mdi-view-dashboard"
                class="cursor-pointer"
                @click="gotoPage('/')"
                title="Home"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-movie-open-outline"
                title="Movies"
                class="cursor-pointer"
                @click="gotoPage('/movies')"
              ></v-list-item>
            </v-list>
          </v-navigation-drawer>
          <v-main style="height: 100vh">
            <router-view />
          </v-main>
        </v-layout>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();


const gotoPage = (path: string) => {
  router.push(path);
};
</script>
