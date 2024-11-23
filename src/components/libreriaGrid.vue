<template>
  <div class="books-container">
    <h1>Libros</h1>
    <div class="books-grid">
      <div v-for="book in books" :key="book.id" class="book-card">
        <img :src="`http://127.0.0.1:3000/images/${book.image}`" alt="Imagen del libro" />
        <h2>{{ book.name }}</h2>
        <p>Autor: {{ book.autor }}</p>
        <p>Precio: ${{ book.price }}</p>
        <p>Género: {{ book.gender }}</p>
        <p>Editorial: {{ book.editory }}</p>
        <div class="actions">
          <button @click.stop="editBook(book)" class="btn edit">Editar</button>
          <button @click.stop="showModal(book)" class="btn delete">Eliminar</button>
        </div>
      </div>
    </div>
    <button class="add-book" @click="navigateToAddBook">Agregar Nuevo Libro</button>

    <!-- Modal de confirmación -->
    <ConfirmModal
      :visible="isModalVisible"
      @confirm="deleteBook"
      @cancel="hideModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import ConfirmModal from "./modalDelete.vue";

export default {
  components: { ConfirmModal },
  data() {
    return {
      books: [],
      isModalVisible: false,
      bookToDelete: null,
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get("http://127.0.0.1:3000/books");
        this.books = response.data.data;
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    },
    editBook(book) {
      
      this.$router.push({ name: "EditBook", params: { bookId: book.id, initialData: book } });
    },
    viewBookDetail(book) {
      this.$router.push({ name: "BookDetail", params: { bookId: book.id } });
    },
    showModal(book) {
      this.bookToDelete = book;
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    async deleteBook() {
      try {
        if (this.bookToDelete) {
          await axios.delete(`http://127.0.0.1:3000/books/${this.bookToDelete.id}`);
          this.books = this.books.filter((book) => book.id !== this.bookToDelete.id);
          this.hideModal();
        }
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
      }
    },
    navigateToAddBook() {
      this.$router.push({ name: "AddBook" });
    },
  },
  created() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
body {
  background: linear-gradient(to bottom, #ff69b4, #000);
  font-family: Arial, sans-serif;
  color: #fff;
}

.books-container {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #ff69b4;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.book-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.book-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.book-card h2 {
  color: #ff69b4;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn.edit {
  background-color: #ff69b4;
  color: #000;
}

.btn.edit:hover {
  background-color: #ff1493;
}

.btn.delete {
  background-color: #ff4040;
  color: #fff;
}

.btn.delete:hover {
  background-color: #d32f2f;
}

.add-book {
  margin-top: 20px;
  padding: 10px 15px;
  background: linear-gradient(to right, #ff69b4, #ff1493);
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-book:hover {
  background: linear-gradient(to right, #ff1493, #ff69b4);
}
</style>
