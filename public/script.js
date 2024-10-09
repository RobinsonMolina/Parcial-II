document.addEventListener('DOMContentLoaded', async () => {

    await loadCharacters();


    document.getElementById('searchId').addEventListener('click', async () => {
        const id = document.getElementById('idSearch').value.trim();
        if (id) {
            await searchCharacterById(id);
        }
    });


    document.getElementById('nameSearch').addEventListener('input', filterCharacters);
});

async function loadCharacters() {
    const response = await fetch('/api/characters');
    const characters = await response.json();
    displayCharacters(characters);
}

function displayCharacters(characters) {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = '';

    characters.forEach(character => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${character._id}</td>
            <td>${character.name}</td>
            <td>${character.height}</td>
            <td>${character.mass}</td>
            <td>${character.hair_color}</td>
            <td>${character.skin_color}</td>
            <td>${character.eye_color}</td>
            <td>${character.birth_year}</td>
            <td>${character.gender}</td>
            <td>${character.homeworld}</td>
            <td>${character.species}</td>
        `;
        characterList.appendChild(row);
    });
}

async function searchCharacterById(id) {
    const response = await fetch(`https://starwars-n5ec-developuptcs-projects.vercel.app/${id}`);
    const data = await response.json();
    
    if (data.result) {
        displayCharacters([data.data]);
    } else {
        alert('Personaje no encontrado.');
    }
}

function filterCharacters() {
    const query = document.getElementById('nameSearch').value.toLowerCase();
    const characterRows = document.querySelectorAll('#characterList tr');

    characterRows.forEach(row => {
        const nameCell = row.cells[1].textContent.toLowerCase();
        row.style.display = nameCell.includes(query) ? '' : 'none';
    });
}
