const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('PORT', process.env.PORT || 3000);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/api/characters', async (req, res) => {
    const response = await fetch('https://starwars-n5ec-developuptcs-projects.vercel.app/');
    const data = await response.json();
    res.json(data.data);
});

app.listen(app.get('PORT'), () => {
    console.log(`Server listening on port ${app.get('PORT')}`);
});
