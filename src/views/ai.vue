<template>
    <div class="exercise-container" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <v-card class="exercise-card">
            <v-card-title class="text-center primary--text">운동 추천</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="user.age" :rules="[rules.required, rules.max123]" label="나이"></v-text-field>
                    <v-select v-model="user.gender" :items="['남성', '여성']" :rules="[rules.required]" label="성별"></v-select>
                    <v-text-field v-model="user.weight" :rules="[rules.required, rules.max561]"
                        label="체중 (kg)"></v-text-field>
                    <v-text-field v-model="user.height" :rules="[rules.required, rules.max252]"
                        label="키 (cm)"></v-text-field>
                    <v-select v-model="user.fitnessLevel" :items="['초보자', '중급자', '고급자']" :rules="[rules.required]"
                        label="현재 체력 수준"></v-select>
                    <v-combobox v-model="user.fitnessGoal"
                        :items="['체중 감량', '근력 강화', '유연성 향상', '체력 증진', '재활 및 회복', '정신 건강 개선']" :rules="[rules.required]"
                        label="운동 목표 (직접 입력 가능)" allow-creating></v-combobox>
                    <v-combobox v-model="user.preferredExercise" :items="['유산소 운동', '근력 운동', '유연성 및 균형 운동', '스포츠']"
                        :rules="[rules.required]" label="선호하는 운동 종류 (직접 입력 가능)" allow-creating></v-combobox>
                </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn color="primary" @click="getExerciseRecommendation" :disabled="!valid">운동 추천받기</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog v-model="recommendationDialog" :width="'600px'" max-width="80vw" persistent>
            <v-card class="tall-dialog">
                <v-card-title class="text-center primary--text">추천 운동</v-card-title>
                <v-card-text class="recommendation-content" style="white-space: pre-wrap;">
                    {{ recommendedExercises.join('\n') }}
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="primary" @click="closeRecommendationDialog">닫기</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="loading" :width="'600px'" max-width="80vw" hide-overlay persistent>
            <v-card class="tall-dialog loading-card">
                <v-card-text class="text-center loading-content">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    <div class="loading-message">{{ loadingMessage }}</div>
                    <div class="loading-tip">Tip: {{ randomTip }}</div>
                </v-card-text>
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
            loading: false,
            loadingMessage: '어떤 운동을 추천해 줄 지 생각중입니다',
            randomTip: '',
            dotCount: 1,
            rules: {
                required: value => !!value || '필수 입력 항목입니다.',
                max123: value => (value <= 123) || '값을 제대로 입력하세요.',
                max561: value => (value <= 561) || '값을 제대로 입력하세요.',
                max252: value => (value <= 252) || '값을 제대로 입력하세요.'
            },
            loadingTips: [
                "운동 전에는 항상 충분한 준비 운동을 해주세요.",
                "수분을 충분히 섭취하여 탈수를 방지하세요.",
                "올바른 자세로 운동하여 부상을 예방하세요.",
                "휴식도 운동의 중요한 부분입니다.",
                "꾸준한 운동이 가장 중요합니다.",
                "다양한 운동을 통해 전신을 골고루 발달시키세요.",
                "운동 후에는 스트레칭으로 근육을 풀어주세요."
            ]
        };
    },
    mounted() {
        this.getRandomImage();
        this.setRandomTip();
        this.startLoadingAnimation();
    },
    methods: {
        async getExerciseRecommendation() {
            this.loading = true;
            try {
                const response = await axios.post('/api/exercise-recommendation', this.user);
                this.recommendedExercises = response.data.exercises.split('\n').filter(line => line.trim() !== '');
                this.recommendationDialog = true;
            } catch (error) {
                console.error('Error fetching exercise recommendations:', error);
            } finally {
                this.loading = false;
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
        },
        setRandomTip() {
            this.randomTip = this.loadingTips[Math.floor(Math.random() * this.loadingTips.length)];
        },
        startLoadingAnimation() {
            // 점 애니메이션 설정
            setInterval(() => {
                this.dotCount = (this.dotCount % 3) + 1;
                this.loadingMessage = `로딩 중${'.'.repeat(this.dotCount)}`;
            }, 1000);
            // 랜덤 팁 변경 시간 설정
            setInterval(() => {
                this.randomTip = this.loadingTips[Math.floor(Math.random() * this.loadingTips.length)];
            }, 10000);
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
    background-color: rgba(255, 255, 255, 0.9);
    margin-bottom: 40px;
}

.v-dialog__content {
    overflow: hidden;
}

.v-card-text {
    max-height: 70vh;
    overflow-y: auto;
}

.tall-dialog {
    height: 80vh;
}

.loading-card {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 80vh;
}

.loading-content {
    margin-top: 300px;
    margin-bottom: 20px;
}

.loading-message {
    margin-top: 20px;
    font-size: 1.2em;
    font-weight: bold;
    animation: fade 1.5s infinite;
}

.loading-tip {
    margin-top: 20px;
    font-size: 1em;
    font-weight: bold;
    color: gray;
}

.recommendation-content {
    font-size: 1.2em;
    font-weight: bold;
}

@keyframes fade {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}
</style>
