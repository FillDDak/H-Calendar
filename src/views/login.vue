<template>
  <div class="login-container" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
    <v-card class="login-card">
      <v-card-title class="text-center">로그인</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-text-field v-model="user.id" label="아이디" @keyup.enter="submit"></v-text-field>
        <v-text-field v-model="user.password" label="패스워드" type="password" @keyup.enter="submit"></v-text-field>
      </v-card-text>
      <v-card-actions class="text-center">
        <v-btn color="primary" @click="submit">로그인</v-btn>
        <v-btn color="primary" @click="join" outlined>회원가입</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        id: "",
        password: ""
      },
      backgroundImage: '',
      errorMessage: ''
    }
  },
  mounted() {
    this.getRandomImage();
  },
  methods: {
    async getRandomImage() {
      try {
        const response = await axios.get('https://picsum.photos/1920/1080');
        this.backgroundImage = response.request.responseURL;
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    },
    submit() {
      if (!this.user.id || !this.user.password) {
        this.errorMessage = "아이디와 비밀번호를 입력해주세요.";
        return;
      }

      this.$axios.post("/user/login", this.user)
        .then(response => {
          if (response.data.result == "success") {
            this.$store.commit("setLoginUser", response.data.user)
            alert("로그인에 성공 했습니다.")
            this.$router.push("/")
          } else {
            this.errorMessage = response.data.message;
          }
        })
    },
    join() {
      this.$router.push("/join")
    }
  }
}
</script>
  
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93.8vh;
  background-size: cover;
  background-position: center;
}

.login-card {
  width: 350px;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 100px;
  background-color: rgba(255, 255, 255, 0.8);
  /* 배경 반투명 처리 */
}

.login-card .v-card-title {
  font-size: 24px;
}

.login-card .v-text-field {
  margin-bottom: 15px;
}

.login-card .v-btn {
  margin-right: 10px;
}
</style>
