require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

// ChatGPT API 설정
const apiKey = process.env.CHATGPT_API_KEY;
const apiEndpoint = 'https://api.openai.com/v1/chat/completions'; // 최신 엔드포인트

router.post('/exercise-recommendation', async (req, res) => {
    const { age, gender, weight, height, fitnessLevel, fitnessGoal, preferredExercise } = req.body;

    // ChatGPT에게 보낼 프롬프트 설정
    const prompt = `
    나이: ${age}
    성별: ${gender}
    체중: ${weight}kg
    키: ${height}cm
    체력 수준: ${fitnessLevel}
    운동 목표: ${fitnessGoal}
    선호하는 운동 종류: ${preferredExercise}
    
    위의 정보를 바탕으로 적합한 운동을 자세히 추천해줘.
  `;

    try {
        const response = await axios.post(apiEndpoint, {
            model: 'gpt-3.5-turbo', // gpt-3.5-turbo, gpt-4o
            messages: [{ role: 'user', content: prompt }],
            // max_tokens: 150 토큰 제한
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const recommendedExercises = response.data.choices[0].message.content.trim();

        res.json({ exercises: recommendedExercises });
    } catch (error) {
        console.error('Error fetching exercise recommendations:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        res.status(500).json({ error: 'Failed to fetch exercise recommendations' });
    }
});

module.exports = router;
