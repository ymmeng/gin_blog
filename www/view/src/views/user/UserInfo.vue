<template>
  <v-card>
    <v-img
      src="http://192.168.58.111:6080/upload/2021-02-11/f21e99bc-f947-4cf4-af35-2abfca4c9cae.jpg"
    >
      <v-card-title>
        <v-col align="center">
          <router-link to="my">
            <v-avatar size="96" color="grey">
              <img
                src="http://192.168.58.111:6080/upload/2021-02-16/b254e7a1-acd7-4999-a8c4-7f8acc3116d9.jpg"
                alt=""
              />
            </v-avatar>
          </router-link>
          <div class="ma-4 white--text">ymmeng</div>
        </v-col>
      </v-card-title>
    </v-img>
    <v-divider class="primary darken-1 ma-3" />
    <v-list nav>
      <v-icon>{{ "mdi-wechat" }}</v-icon>
      <v-icon>{{ "mdi-github" }}</v-icon>
      <v-icon>{{ "mdi-youtube" }}</v-icon>
      <v-icon>{{ "mdi-email" }}</v-icon>
    </v-list>
  </v-card>
</template>
