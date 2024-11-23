<template>
  <form @submit.prevent="submitForm" class="book-form">
    <h1>Agregar Libro</h1>
    <div class="form-group">
      <label for="name">Nombre:</label>
      <input id="name" v-model="name" placeholder="Nombre del libro" required />
    </div>
    <div class="form-group">
      <label for="price">Precio:</label>
      <input
        id="price"
        type="number"
        v-model="price"
        placeholder="Precio del libro"
        min="0"
        required
      />
      <p v-if="price < 0" class="error">El precio no puede ser menor a 0.</p>
    </div>
    <div class="form-group">
      <label for="image">Imagen:</label>
      <input
        id="image"
        type="file"
        @change="onFileChange"
        accept="image/*"
        required
      />
    </div>
    <div class="form-group">
      <label for="gender">Género:</label>
      <input
        id="gender"
        type="text"
        v-model="gender"
        placeholder="Género literario"
        required
      />
    </div>
    <div class="form-group">
      <label for="editory">Editorial:</label>
      <input
        id="editory"
        type="text"
        v-model="editory"
        placeholder="Editorial"
        required
      />
    </div>
    <div class="form-group">
      <label for="autor">Autor:</label>
      <input
        id="autor"
        type="text"
        v-model="autor"
        placeholder="Autor del libro"
        required
      />
    </div>
    <button type="submit">Guardar</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      price: "",
      image: "",
      gender: "",
      editory: "",
      autor: "",
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.image = file;
    },
    async submitForm() {
      // Validación del precio
      if (this.price < 0) {
        alert("El precio no puede ser menor a 0.");
        return; // Detener el envío del formulario
      }

      const formdata = new FormData();
      formdata.append("name", this.name);
      formdata.append("price", this.price);
      formdata.append("image", this.image);
      formdata.append("gender", this.gender);
      formdata.append("editory", this.editory);
      formdata.append("autor", this.autor);

      try {
        const respuesta = await axios.post(
          "http://127.0.0.1:3000/books",
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Libro guardado:", respuesta.data);
        this.$router.push({ name: "BooksGrid" });
      } catch (error) {
        console.error("Error al guardar el libro:", error);
      }
    },
  },
};
</script>

<style scoped>
body {
  background: linear-gradient(to bottom, #ff69b4, #000);
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #fff;
}

.book-form {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.book-form h1 {
  text-align: center;
  color: #ff69b4;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #ff69b4;
}

input {
  padding: 10px;
  border: 1px solid #ff69b4;
  border-radius: 5px;
  background: #000;
  color: #ff69b4;
  font-size: 14px;
}

input::placeholder {
  color: #ff69b4;
}

input:focus {
  border-color: #fff;
  outline: none;
  box-shadow: 0 0 8px #ff69b4;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #ff69b4;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #ff1493;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>

