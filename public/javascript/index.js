const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    try {
      const allCharacters = await charactersAPI.getFullList();
      displayCharacters(allCharacters);
      console.log("All Characters:", allCharacters);
    } catch (error) {
      console.error('Error fetching all characters:', error.message);
    }
  });

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    event.preventDefault();
    const charIdInput = document.getElementById('character-id').value;
    try {
      const character = await charactersAPI.getOneRegister(charIdInput);
      displayCharacter(character);
      console.log("Character by ID:", character);
    } catch (error) {
      console.error('Error fetching character by ID:', error.message);
    }
  });
});

function displayCharacters(characters) {
  const charactersContainer = document.querySelector('.characters-container');
  charactersContainer.innerHTML = '';

  characters.forEach(character => {
    const characterCard = createCharacterCard(character);
    charactersContainer.appendChild(characterCard);
  });
}

function displayCharacter(character) {
  const characterContainer = document.querySelector('.characters-container');
  characterContainer.innerHTML = '';

  const characterCard = createCharacterCard(character);
  characterContainer.appendChild(characterCard);
}

function createCharacterCard(character) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('character-card');

  const idDiv = document.createElement('div');
  idDiv.textContent = `ID: ${character.id}`;
  cardDiv.appendChild(idDiv);

  const nameDiv = document.createElement('div');
  nameDiv.textContent = `Name: ${character.name}`;
  cardDiv.appendChild(nameDiv);

  const occupationDiv = document.createElement('div');
  occupationDiv.textContent = `Occupation: ${character.occupation}`;
  cardDiv.appendChild(occupationDiv);

  const cartoonDiv = document.createElement('div');
  cartoonDiv.textContent = `Is a Cartoon: ${character.cartoon ? 'True' : 'False'}`;
  cardDiv.appendChild(cartoonDiv);

  const weaponDiv = document.createElement('div');
  weaponDiv.textContent = `Weapon: ${character.weapon}`;
  cardDiv.appendChild(weaponDiv);

  return cardDiv;
}