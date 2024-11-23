<template>
    <div class="book-detail">
      <template v-if="book">
        <h1>{{ book.name }}</h1>
        <div class="book-info">
          <img :src="`http://127.0.0.1:3000/images/${book.image}`" alt="Imagen del libro" />
          <div class="book-details">
            <p><strong>Autor:</strong> {{ book.autor }}</p>
            <p><strong>Precio:</strong> ${{ book.price }}</p>
            <p><strong>Género:</strong> {{ book.gender }}</p>
            <p><strong>Editorial:</strong> {{ book.editory }}</p>
          </div>
        </div>
        <button @click="goBack" class="back-button">Volver</button>
      </template>
      <template v-else>
        <p>Cargando los detalles del libro...</p>
        <button @click="goBack" class="back-button">Volver</button>
      </template>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        book: null, // Estado inicial como null para evitar errores de renderización
      };
    },
    methods: {
        async fetchBook() {
  try {
    const bookId = this.$route.params.bookId; // Obtiene el ID del libro desde los parámetros de la ruta
    console.log("Fetching book with ID:", bookId);  // Verifica el ID
    const response = await axios.get(`http://127.0.0.1:3000/books/${bookId}`);
    this.book = response.data.data || response.data;
  } catch (error) {
    console.error("Error al obtener los detalles del libro:", error);
  }
},
      goBack() {
        this.$router.push({ name: "BooksGrid" }); // Navega de regreso a la lista de libros
      },
    },
    created() {
      this.fetchBook(); // Llama a la API al montar el componente
    },
  };
  </script>
  
  <style scoped>
  .book-detail {
    padding: 20px;
    text-align: center;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .book-info {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    margin-top: 20px;
  }
  
  .book-info img {
    width: 200px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .book-details {
    text-align: left;
    max-width: 400px;
  }
  
  .book-details p {
    margin: 10px 0;
    font-size: 1rem;
  }
  
  .back-button {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #ff69b4;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .back-button:hover {
    background-color: #ff1493;
  }
  </style>
  

<style scoped>
.book-detail {
  padding: 20px;
  text-align: center;
  background-color: #ffd1dc;
}

h1 {
  font-size: 2.5rem;
  color: #ff69b4;
}

.book-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.book-info img {
  width: 300px;
  height: auto;
  border-radius: 10px;
  border: 2px solid #ff69b4;
}

.book-details {
  text-align: left;
  font-size: 1.2rem;
  color: #333;
}

.back-button {
  margin-top: 20px;
  padding: 10px 15px;
  background: #ff69b4;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #ff1493;
}
</style>
