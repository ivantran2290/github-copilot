const fs = require('fs').promises;
const path = require('path');

function calculateAge(yearOfBirth) {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth;
}

async function getCityTemperature(city) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.main.temp;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
async function getTopNewsLinks() {
    const apiKey = 'f894763a6c8e41e18c4a7f3546b2d0eb'; // Replace with your actual API key
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.articles.slice(0, 5).map(article => article.url);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
// 天気予報APIを使用して、指定された都市の天気を取得する関数
async function getWeatherForecast(city) {
    const apiKey = 'YOUR_API_KEY'; // 実際のAPIキーに置き換えてください
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('ネットワーク応答が正常ではありません');
        }
        const data = await response.json();
        return data.list.slice(0, 5).map(forecast => ({
            date: forecast.dt_txt,
            temperature: forecast.main.temp,
            weather: forecast.weather[0].description
        }));
    } catch (error) {
        console.error('フェッチ操作に問題が発生しました:', error);
    }
}

// 為替レートAPIを使用して、指定された通貨ペアの為替レートを取得する関数
async function getExchangeRate(baseCurrency, targetCurrency) {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('ネットワーク応答が正常ではありません');
        }
        const data = await response.json();
        return data.rates[targetCurrency];
    } catch (error) {
        console.error('フェッチ操作に問題が発生しました:', error);
    }
}

// Sử dụng API GitHub để lấy các kho lưu trữ của người dùng được chỉ định
async function getUserRepositories(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Phản hồi mạng không ổn định');
        }
        const data = await response.json();
        return data.map(repo => repo.name);
    } catch (error) {
        console.error('Đã xảy ra sự cố với thao tác fetch:', error);
    }
}
async function getCountryList() {
    const filePath = path.join(__dirname, 'data.json');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const countries = JSON.parse(data);
        return countries;
    } catch (error) {
        console.error('Đã xảy ra sự cố khi đọc file:', error);
    }
}