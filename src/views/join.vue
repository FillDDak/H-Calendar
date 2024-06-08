<template>
    <div class="signup-container" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <v-card class="signup-card">
            <v-card-title class="text-center">회원가입</v-card-title>
            <v-card-text>
                <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
                <v-text-field v-model="user.id" label="아이디" @keyup.enter="submit"></v-text-field>
                <v-text-field v-model="user.name" label="이름" @keyup.enter="submit"></v-text-field>
                <v-text-field v-model="user.password" label="패스워드" type="password" @keyup.enter="submit"></v-text-field>
                <v-text-field v-model="user.passwordConfirm" label="패스워드 확인" type="password"
                    @keyup.enter="submit"></v-text-field>
            </v-card-text>
            <v-card-actions class="text-center">
                <v-btn color="primary" @click="submit">가입</v-btn>
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
                name: "",
                password: "",
                passwordConfirm: ""
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
            if (this.user.id == "") {
                this.errorMessage = "아이디를 입력하세요.";
                return;
            }

            if (this.user.name == "") {
                this.errorMessage = "이름을 입력하세요.";
                return;
            }

            if (this.user.password == "") {
                this.errorMessage = "패스워드를 입력하세요.";
                return;
            }

            if (this.user.password !== this.user.passwordConfirm) {
                this.errorMessage = "패스워드가 일치하지 않습니다.";
                return;
            }

            this.$axios.post("/user/join", this.user)
                .then(response => {
                    if (response.data.result == "success") {
                        alert("가입이 성공 되었습니다.");
                        this.$router.push("/login");
                    } else {
                        this.errorMessage = response.data.message;
                    }
                })
        }
    }
}
</script>
  
<style scoped>
.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 93.8vh;
    background-size: cover;
    background-position: center;
}

.signup-card {
    width: 350px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    margin-bottom: 100px;
}

.signup-card .v-card-title {
    font-size: 24px;
}

.signup-card .v-text-field {
    margin-bottom: 15px;
}

.signup-card .v-btn {
    margin-right: 10px;
}
</style>
