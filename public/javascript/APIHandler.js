class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  // Function to get all characters
  async getFullList() {
    try {
      const response = await axios.get(`${this.BASE_URL}/characters`);
      // console.log(response)
      console.log("All Characters:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all characters:', error.message);
      return null;
    }
  }

  // Function to get a single character by ID
  async getOneRegister(id) {
    try {
      const response = await axios.get(`${this.BASE_URL}/characters/${id}`);
      console.log("Character by ID:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching character by ID:', error.message);
      return null;
    }
  }

  // Function to create a new character
  async createOneRegister(newCharacter) {
    try {
      const response = await axios.post(`${this.BASE_URL}/characters`,newCharacter);
      console.log("Created Character:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating character:', error.message);
      return null;
    }
  }

  // Function to update a character by ID
async updateOneRegister(id, updatedCharacter) {
  try {
    const response = await axios.put(`${this.BASE_URL}/characters/${id}`, updatedCharacter);
    setTimeout(() => {
      console.log("Updated Character:", response.data);
    }, 100); // Delay in milliseconds
    return response.data;
  } catch (error) {
    console.error("Error updating character:", error.response.data);
  }
}

// Function to delete a character by ID
async deleteOneRegister(id) {
  try {
    const response = await axios.delete(`${this.BASE_URL}/characters/${id}`);
    console.log("Deleted Character:",response.data);
    return "Character has been successfully deleted";
  } catch (error) {
    console.error("Error deleting character:", error.response.data);
  }
}
  }