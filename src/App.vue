<template>
  <v-app>
    <v-main>
      <div class="header-bar">
        <v-layout align-center>
          <v-btn to="/" variant="text">H-Calendar</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="!$store.state.loginUser" to="/login" variant="text">로그인</v-btn>
          <v-btn variant="text" v-if="$store.state.loginUser" to="mypage">
            {{ $store.state.loginUser.name }}
          </v-btn>
          <v-btn variant="text" v-if="$store.state.loginUser" to="login" @click="logout">로그아웃
          </v-btn>
          <v-btn v-if="$store.state.loginUser" to="/list" variant="text">게시판</v-btn>
          <v-btn v-if="$store.state.loginUser" to="/calendar" variant="text">캘린더</v-btn>
          <v-btn v-if="$store.state.loginUser" to="/ai" variant="text">운동 추천</v-btn>
        </v-layout>
      </div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {
    this.$axios.post("/user/info")
      .then(response => {
        if (response.data.result == "success") {
          this.$store.commit("setLoginUser", response.data.user)
        }

      })
  },
  methods: {
    logout() {
      this.$axios.post("/user/logout")
        .then(response => {
          if (response.data.result == "success") {
            this.$store.commit("logout")
          }
        })
    }
  }
}
</script>
<style lang="less">
.header-bar {
  padding: 10px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 0px;

  .brand {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
