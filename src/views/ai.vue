<template>
    <div class="exercise-container" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <v-card class="exercise-card">
            <v-card-title class="text-center primary--text">운동 추천</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="user.age" :rules="[rules.required]" label="나이"></v-text-field>
                    <v-select v-model="user.gender" :items="['남성', '여성']" :rules="[rules.required]" label="성별"></v-select>
                    <v-text-field v-model="user.weight" :rules="[rules.required]" label="체중 (kg)"></v-text-field>
                    <v-text-field v-model="user.height" :rules="[rules.required]" label="키 (cm)"></v-text-field>
                    <v-select v-model="user.fitnessLevel" :items="['초보자', '중급자', '고급자']" :rules="[rules.required]"
                        label="현재 체력 수준"></v-select>
                    <v-select v-model="user.fitnessGoal" :items="['체중 감량', '근력 강화', '유연성 향상']" :rules="[rules.required]"
                        label="운동 목표"></v-select>
                    <v-select v-model="user.preferredExercise" :items="['유산소 운동', '근력 운동', '요가']" :rules="[rules.required]"
                        label="선호하는 운동 종류"></v-select>
                </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn color="primary" @click="getExerciseRecommendation" :disabled="!valid">운동 추천받기</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog v-model="recommendationDialog" :max-width="'90vw'" :max-height="'90vh'">
            <v-card>
                <v-card-title class="text-center primary--text">추천 운동</v-card-title>
                <v-card-text style="white-space: pre-wrap;">
                    {{ recommendedExercises.join('\n') }}
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="primary" @click="closeRecommendationDialog">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            user: {
                age: '',
                gender: '',
                weight: '',
                height: '',
                fitnessLevel: '',
                fitnessGoal: '',
                preferredExercise: ''
            },
            valid: false,
            recommendationDialog: false,
            recommendedExercises: [],
            backgroundImage: '',
            rules: {
                required: value => !!value || '필수 입력 항목입니다.'
            }
        };
    },
    mounted() {
        this.getRandomImage();
    },
    methods: {
        async getExerciseRecommendation() {
            try {
                const response = await axios.post('/api/exercise-recommendation', this.user);
                this.recommendedExercises = response.data.exercises.split('\n').filter(line => line.trim() !== '');
                this.recommendationDialog = true;
            } catch (error) {
                console.error('Error fetching exercise recommendations:', error);
            }
        },
        closeRecommendationDialog() {
            this.recommendationDialog = false;
        },
        async getRandomImage() {
            try {
                const response = await axios.get('https://source.unsplash.com/random/1920x1080');
                this.backgroundImage = response.request.responseURL;
            } catch (error) {
                console.error('Error fetching random image:', error);
            }
        }
    }
};
</script>
  
<style scoped>
.exercise-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 93.8vh;
    padding: 20px;
    background-size: cover;
    background-position: center;
}

.exercise-card {
    width: 100%;
    max-width: 600px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.9); /* 배경 반투명 처리 */
}

.v-dialog__content {
    overflow: hidden;
}

.v-card-text {
    max-height: 70vh;
    overflow-y: auto;
}
</style>
