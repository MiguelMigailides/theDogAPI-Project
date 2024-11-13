require('dotenv').config();

const express = require('express');
const axios = require('axios');


const app = express();
const PORT = 3000;

app.use(express.static('public'))

const DOG_API_KEY = 'live_ignV7agchoVyzCyfy2E30iSoyuVtCNFlEZjnmHaBuC5eoHdHSp8B54Vm60UayRgx';

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/dog-data", async (req, res) => {
    const url = `https://api.thedogapi.com/v1/images/search?has_breeds=true`;

    try {
        const response = await axios.get(url, {
            headers: { 'x-api-key': DOG_API_KEY }
        });
        
        const tempoData = response.data;
        console.log("Resposta da API:", tempoData);

        if (tempoData.length > 0 && tempoData[0].breeds && tempoData[0].breeds.length > 0) {
            const breed = tempoData[0].breeds[0];
            const name = breed.name;
            const bredFor = breed.bred_for;
            const breedGroup = breed.breed_group
            const age = breed.life_span;
            const temperament = breed.temperament;
            const imgUrl = tempoData[0].url;

            res.json({ name, bredFor,breedGroup, age, temperament, imgUrl })
        } else {
            res.json({error:"Dados da raça nao encontrados."})
        }
    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        res.status(500).send("Erro ao fazer a requisição.");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
