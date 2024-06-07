<template>
  <v-app>
    <v-main>
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item v-if="$store.state.loginUser" to="mypage">
            <v-list-item-title>{{ $store.state.loginUser.name }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.loginUser" to="/list">
            <v-list-item-title>게시판</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.loginUser" to="/calendar">
            <v-list-item-title>캘린더</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.loginUser" to="/ai">
            <v-list-item-title>운동 추천</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!$store.state.loginUser" to="/login">
            <v-list-item-title>로그인</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.loginUser" @click="logout">
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <div class="header-bar">
        <v-layout align-center>
          <v-btn to="/" variant="text">H-Calendar</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="!$store.state.loginUser" to="/login" variant="text">Login</v-btn>
          <v-btn variant="text" v-if="$store.state.loginUser" to="mypage">
            {{ $store.state.loginUser.name }}
          </v-btn>
          <v-btn variant="text" v-if="$store.state.loginUser" @click="logout">Logout</v-btn>
          <v-btn @click="toggleDrawer" variant="text">Menu</v-btn>
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
    drawer: false,
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
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    logout() {
      this.$axios.post("/user/logout")
        .then(response => {
          if (response.data.result == "success") {
            this.$store.commit("logout")
            this.$router.push('/')
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
