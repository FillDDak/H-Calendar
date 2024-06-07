<template>
  <v-app>
    <v-main>
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item v-if="$store.state.loginUser" to="mypage">
            <v-list-item-title>
              <v-icon class="list-icon">mdi-account</v-icon>
              <span class="list-text">{{ $store.state.loginUser.name }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-divider v-if="$store.state.loginUser"></v-divider>
          <v-list-item v-if="$store.state.loginUser" to="/list">
            <v-list-item-title>
              <v-icon class="list-icon">mdi-bulletin-board</v-icon>
              <span class="list-text">게시판</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.loginUser" to="/calendar">
            <v-list-item-title>
              <v-icon class="list-icon">mdi-calendar-edit</v-icon>
              <span class="list-text">캘린더</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.loginUser" to="/ai">
            <v-list-item-title>
              <v-icon class="list-icon">mdi-dumbbell</v-icon>
              <span class="list-text">운동 추천</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!$store.state.loginUser" to="/login">
            <v-list-item-title>
              <v-icon class="list-icon">mdi-login</v-icon>
              <span class="list-text">로그인</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="$store.state.loginUser" @click="logout">
            <v-list-item-title>
              <v-icon class="list-icon">mdi-logout</v-icon>
              <span class="list-text">로그아웃</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <div class="header-bar">
        <v-layout align-center>
          <v-btn @click="toggleDrawer" variant="text"><v-icon size="28px">mdi-menu</v-icon></v-btn>
          <v-btn to="/" variant="text"><v-icon>mdi-home</v-icon>H-Calendar</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="!$store.state.loginUser" to="/login" variant="text"><v-icon>mdi-login</v-icon>Login</v-btn>
          <v-btn variant="text" v-if="$store.state.loginUser" to="mypage"><v-icon>mdi-account</v-icon>
            {{ $store.state.loginUser.name }}
          </v-btn>
          <v-btn variant="text" v-if="$store.state.loginUser" @click="logout"><v-icon>mdi-logout</v-icon>Logout</v-btn>
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

.list-icon {
  margin-right: 8px;  /* 아이콘과 텍스트 사이의 간격 */
}

.list-text {
  display: inline-block;
}
</style>
