<template>
    <div class="home">
        <div v-for="(section, index) in sections" :key="index" class="section"
            :style="{ backgroundImage: 'url(' + section.backgroundImage + ')' }">
            <div class="content-box animated-content">
                <h1 class="animated-title">{{ section.title }}</h1>
                <v-btn v-if="$store.state.loginUser" to="/calendar" variant="text" class="animated-button">get
                    started</v-btn>
                <v-btn v-if="!$store.state.loginUser" to="/login" variant="text" class="animated-button">Go to Login</v-btn>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            sections: [
                { title: 'H-Calendar에 오신 것을 환영합니다.', backgroundImage: require('@/assets/images/unsplash-c59hEeerAaI-unsplash.jpg') },
                { title: '당신의 운동 기록을 작성하세요.', backgroundImage: require('@/assets/images/emma-simpson-mNGaaLeWEp0-unsplash.jpg') },
                { title: '다른 사람과 정보를 공유하세요.', backgroundImage: require('@/assets/images/anastase-maragos-FP7cfYPPUKM-unsplash.jpg') },
                { title: '자신에게 알맞는 운동을 추천 받으세요.', backgroundImage: require('@/assets/images/christopher-campbell-kFCdfLbu6zA-unsplash.jpg') },
                { title: '지금 바로 시작.', backgroundImage: require('@/assets/images/fitsum-admasu-oGv9xIl7DkY-unsplash.jpg') }
            ]
        };
    }
};
</script>
  
<style>
.home {
    width: 100%;
    height: 93.8vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
}

.section {
    width: 100%;
    height: 93.8vh;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    position: relative;
    scroll-snap-align: start;
}

.content-box {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 100px;
}

.animated-content {
    animation: slideInContent 1s forwards;
}

.animated-title {
    margin-top: 20px;
    opacity: 0;
    transform: translateY(50px);
    animation: slideInTitle 1s forwards;
}

.animated-button {
    margin-top: 20px;
    opacity: 0;
    transform: translateY(50px);
    animation: slideInButton 1s forwards;
}

@keyframes slideInContent {
    0% {
        opacity: 0;
        transform: translateY(50px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInTitle {
    0% {
        opacity: 0;
        transform: translateY(50px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInButton {
    0% {
        opacity: 0;
        transform: translateY(50px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
