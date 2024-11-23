<template>
    <div class="edit-book-form">
      <h1>Editar Libro</h1>
      <form @submit.prevent="updateBook">
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input id="name" v-model="book.name" placeholder="Nombre del libro" required />
        </div>
        <div class="form-group">
          <label for="price">Precio:</label>
          <input id="price" type="number" v-model="book.price" placeholder="Precio" min="0" required />
        </div>
        <div class="form-group">
          <label for="image">Imagen:</label>
          <input id="image" type="file" @change="onFileChange" accept="image/*" />
        </div>
        <div class="form-group">
          <label for="gender">Género:</label>
          <input id="gender" v-model="book.gender" placeholder="Género" required />
        </div>
        <div class="form-group">
          <label for="editory">Editorial:</label>
          <input id="editory" v-model="book.editory" placeholder="Editorial" required />
        </div>
        <div class="form-group">
          <label for="autor">Autor:</label>
          <input id="autor" v-model="book.autor" placeholder="Autor" required />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        book: {
          id: null,
          name: "",
          price: "",
          image: "",
          gender: "",
          editory: "",
          autor: "",
        },
      };
    },
    methods: {
      // Obtiene los datos iniciales del libro cuando la página se carga
      async fetchBook() {
        const { bookId, initialData } = this.$route.params;
        if (initialData) {
          this.book = { ...initialData };
        } else {
          try {
            const response = await axios.get(`http://127.0.0.1:3000/books/${bookId}`);
            this.book = response.data.data;
          } catch (error) {
            console.error("Error al obtener el libro:", error);
          }
        }
      },
      onFileChange(event) {
        const file = event.target.files[0];
        this.book.image = file;
      },
      async updateBook() {
        try {
          const formData = new FormData();
          formData.append("name", this.book.name);
          formData.append("price", this.book.price);
          formData.append("image", this.book.image);
          formData.append("gender", this.book.gender);
          formData.append("editory", this.book.editory);
          formData.append("autor", this.book.autor);
  
          const response = await axios.put(
            `http://127.0.0.1:3000/books/${this.book.id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
  
          console.log("Libro actualizado:", response.data);
          this.$router.push({ name: "BooksGrid" }); // Redirige después de la actualización
        } catch (error) {
          console.error("Error al actualizar el libro:", error);
        }
      },
    },
    created() {
      this.fetchBook();
    },
  };
  </script>
  
  <style scoped>
  /* Agregar estilos para el formulario de edición */
  .edit-book-form {
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .edit-book-form h1 {
    color: #ff69b4;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    color: #ff69b4;
  }
  
  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ff69b4;
    background: #000;
    color: #fff;
    width: 100%;
  }
  
  button {
    background: #ff69b4;
    color: #000;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background: #ff1493;
  }
  </style>
  