const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', async function (event) {
    // console.log(event)
    try {
      const allCharacters = await charactersAPI.getFullList();
      displayCharacters(allCharacters);
      console.log("All Characters:", allCharacters);
    } catch (error) {
      console.error('Error fetching all characters:', error.message);
    }
  });

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    const charIdInput = document.getElementById('character-id').value;
    try {
      const character = await charactersAPI.getOneRegister(charIdInput);
      displayCharacter(character);
      console.log("Character by ID:", character);
    } catch (error) {
      console.error('Error fetching character by ID:', error.message);
    }
  });
  
  document.getElementById('delete-one').addEventListener('click', async function (event) {
    const charIdInput = document.getElementById('character-id-delete').value;
    try {
      const result = await charactersAPI.deleteOneRegister(charIdInput);
      console.log(result);
      // Get the button element by its ID
      const buttonElement = document.getElementById('fetch-one');

      // Change the background color
      buttonElement.style.backgroundColor = 'green';
    } catch (error) {
      console.error('Error deleting character:', error.message);
      // Get the button element by its ID
      const buttonElement = document.getElementById('fetch-one');
      // Change the background color
      buttonElement.style.backgroundColor = 'red';
    }
  });

  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const nameInput = document.getElementById('new-name-input').value;
    const occupationInput = document.getElementById('new-occupation-input').value;
    const weaponInput = document.getElementById('new-weapon-input').value;
    const cartoonInput = document.getElementById('new-cartoon-input').checked;

    const newCharacter = {
      name: nameInput,
      occupation: occupationInput,
      cartoon: cartoonInput,
      weapon: weaponInput,
    };

    try {
      const createdCharacter = await charactersAPI.createOneRegister(newCharacter);
      console.log('Created Character:', createdCharacter);
      // Change the background color of the button to green
      document.getElementById('create-data').style.backgroundColor = 'green';
    } catch (error) {
      console.error('Error creating character:', error.message);
      // Change the background color of the button to red
      document.getElementById('create-data').style.backgroundColor = 'red';
    }
  });

  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const charIdInput = document.getElementById('chr-id').value;
    const nameInput = document.getElementById('edit-name-input').value;
    const occupationInput = document.getElementById('edit-occupation-input').value;
    const weaponInput = document.getElementById('edit-weapon-input').value;
    const cartoonInput = document.getElementById('edit-cartoon-input').checked;

    const updatedCharacter = {
      name: nameInput,
      occupation: occupationInput,
      cartoon: cartoonInput,
      weapon: weaponInput,
    };

    try {
      const updated = await charactersAPI.updateOneRegister(charIdInput, updatedCharacter);
      console.log('Updated Character:', updated);
      // Change the background color of the button to green
      document.getElementById('edit-data').style.backgroundColor = 'green';
    } catch (error) {
      console.error('Error updating character:', error.message);
      // Change the background color of the button to red
      document.getElementById('edit-data').style.backgroundColor = 'red';
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