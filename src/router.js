import { createRouter, createWebHistory } from "vue-router";
import AddBook from "@/components/AddBook.vue";
import BooksGrid from "@/components/libreriaGrid.vue";
import BookDetail from "@/components/BookDetail.vue"; // Importa el componente de detalle

const routes = [
  { path: "/", name: "BooksGrid", component: BooksGrid },
  { path: "/add-book", name: "AddBook", component: AddBook },
  { path: "/book/:bookId", name: "BookDetail", component: BookDetail }, // Ruta para ver detalles del libro
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
