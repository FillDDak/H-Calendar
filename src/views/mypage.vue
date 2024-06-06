<template>
    <div class="mypage-container" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <v-card class="mypage-card">
            <v-card-title class="text-center primary--text">마이페이지</v-card-title>
            <v-card-text>
                <v-list dense>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>아이디</v-list-item-title>
                            <v-list-item-subtitle>{{ user.id }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>이름</v-list-item-title>
                            <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>가입일</v-list-item-title>
                            <v-list-item-subtitle>{{ formattedJoinDate }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="action-btn" color="primary" @click="changePasswordDialog = true">비밀번호 변경</v-btn>
                    <v-btn class="action-btn" color="error" @click="deleteAccountDialog = true">회원 탈퇴</v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>

        <!-- 비밀번호 변경 다이얼로그 -->
        <v-dialog v-model="changePasswordDialog" max-width="400">
            <v-card class="dialog-card">
                <v-card-title class="text-center primary--text">비밀번호 변경</v-card-title>
                <v-card-text>
                    <v-form ref="changePasswordForm" v-model="valid">
                        <v-text-field v-model="currentPassword" :rules="[rules.required]" label="현재 비밀번호"
                            type="password"></v-text-field>
                        <v-text-field v-model="newPassword" :rules="[rules.required]" label="새로운 비밀번호"
                            type="password"></v-text-field>
                        <v-text-field v-model="confirmNewPassword" :rules="[rules.match]" label="새로운 비밀번호 확인"
                            type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="primary" @click="changePassword" :disabled="!valid">변경</v-btn>
                    <v-btn color="error" @click="changePasswordDialog = false">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- 회원 탈퇴 다이얼로그 -->
        <v-dialog v-model="deleteAccountDialog" max-width="400">
            <v-card class="dialog-card">
                <v-card-title class="text-center error--text">회원 탈퇴</v-card-title>
                <v-card-text>
                    <p>정말로 회원 탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="error" @click="deleteAccount">탈퇴</v-btn>
                    <v-btn @click="deleteAccountDialog = false">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';

export default {
    name: 'MyPage',
    data() {
        return {
            user: {},
            backgroundImage: '',
            changePasswordDialog: false,
            deleteAccountDialog: false,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            valid: false,
            rules: {
                required: value => !!value || '필수 입력 항목입니다.',
                match: value => value === this.newPassword || '새로운 비밀번호가 일치하지 않습니다.'
            }
        }
    },
    computed: {
        formattedJoinDate() {
            if (!this.user.joinDate) return '';
            return format(new Date(this.user.joinDate), 'yyyy년 MM월 dd일 HH시 mm분');
        }
    },
    created() {
        this.fetchUserInfo();
        this.getRandomImage();
    },
    methods: {
        fetchUserInfo() {
            // 로그인된 사용자 정보를 서버로부터 가져오는 메서드
            this.$axios.post("/user/info")
                .then(response => {
                    if (response.data.result === "success") {
                        this.user = response.data.user;
                    } else {
                        // 로그인 정보가 없을 경우 처리
                        // 예를 들어 로그인 페이지로 이동하는 등의 작업을 수행할 수 있습니다.
                    }
                })
                .catch(error => {
                    console.error("Error fetching user info:", error);
                });
        },
        async getRandomImage() {
            try {
                const response = await axios.get('https://source.unsplash.com/random/1920x1080');
                this.backgroundImage = response.request.responseURL;
            } catch (error) {
                console.error('Error fetching random image:', error);
            }
        },
        changePassword() {
            if (this.$refs.changePasswordForm.validate()) {
                this.$axios.post("/user/change-password", {
                    id: this.user.id,
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword
                })
                    .then(response => {
                        if (response.data.result === "success") {
                            alert("비밀번호가 성공적으로 변경되었습니다.");
                            this.changePasswordDialog = false;
                            this.currentPassword = "";
                            this.newPassword = "";
                            this.confirmNewPassword = "";
                        } else {
                            alert(response.data.message);
                        }
                    })
                    .catch(error => {
                        alert("비밀번호 변경에 실패했습니다.");
                        console.error('Error changing password:', error);
                    });
            }
        },
        deleteAccount() {
            this.$axios.post("/user/delete", { id: this.user.id })
                .then(response => {
                    if (response.data.result === "success") {
                        alert("회원 탈퇴가 성공적으로 완료되었습니다.");
                        this.deleteAccountDialog = false;
                        this.$router.push("/login").then(() => {
                            window.location.reload();
                        });
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(error => {
                    alert("회원 탈퇴에 실패했습니다.");
                    console.error('Error deleting account:', error);
                });
        }
    }
}
</script>

<style scoped>
.mypage-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 93.8vh;
    background-size: cover;
    background-position: center;
    padding: 20px;
}

.mypage-card,
.dialog-card {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255);
    margin-bottom: 100px;
}

.error--text {
    color: #e53935 !important;
}

.v-card-title {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
}

.v-card-actions {
    display: flex;
    justify-content: space-between;
    padding: 16px;
}

.action-btn {
    width: 45%;
    min-width: 120px;
}

.v-list-item-title {
    font-weight: 500;
}

.v-list-item-subtitle {
    color: rgba(0, 0, 0);
}

.v-divider {
    margin: 16px 0;
}
</style>
