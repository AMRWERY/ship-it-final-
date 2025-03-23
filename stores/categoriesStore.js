import { db, storage } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [],
    filteredCategories: [],
    subCategories: [],
    paginatedCategories: [],
    paginatedSubcategories: [],
    currentPage: 1,
    categoriesPerPage: 8,
    subcategoriesPerPage: 4,
    currentCategory: null,
    currentMarketCategory: null,
  }),

  actions: {
    async fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        this.categories = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => a.catId - b.catId);
        this.updatePagination();
        // console.log("Fetched categories:", this.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async fetchCategoryById(catId) {
      try {
        const q = query(
          collection(db, "categories"),
          where("catId", "==", Number(catId))
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          this.currentCategory = querySnapshot.docs[0].data();
        } else {
          this.currentCategory = null;
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    },

    fetchCategoriesByRange(minId, maxId) {
      this.filteredCategories = this.categories.filter(
        (cat) => Number(cat.catId) >= minId && Number(cat.catId) <= maxId
      );
    },

    addCategory(title, imageFile) {
      const storage = getStorage();
      const storagePath = "/categories/" + imageFile.name;
      const storageRef = ref(storage, storagePath);
      return uploadBytes(storageRef, imageFile)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((imageUrl) => {
          return getDocs(collection(db, "categories")).then((querySnapshot) => {
            const categories = querySnapshot.docs.map((doc) => doc.data());
            const maxId =
              categories.length > 0
                ? Math.max(...categories.map((cat) => cat.catId || 0))
                : 0;
            const newId = maxId + 1;
            return addDoc(collection(db, "categories"), {
              catId: newId,
              title,
              imgOne: imageUrl,
            }).then(() => {
              const newCategory = { id: newId, title, imgOne: imageUrl };
              this.categories.push(newCategory);
            });
          });
        });
    },

    async deleteCategory(categoryId) {
      try {
        const categoryDoc = doc(db, "categories", categoryId);
        await deleteDoc(categoryDoc);
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
        this.updatePagination();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },

    fetchSubCategories() {
      getDocs(collection(db, "subCategories"))
        .then((querySnapshot) => {
          this.subCategories = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.updatePagination();
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        });
    },

    updatePagination() {
      this.paginatedCategories = this.categories.slice(
        (this.currentPage - 1) * this.categoriesPerPage,
        this.currentPage * this.categoriesPerPage
      );
    },

    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    },
  },

  getters: {
    totalPages() {
      return Math.ceil(this.categories.length / this.categoriesPerPage);
    },

    totalPagesSubcategory() {
      return Math.ceil(this.categories.length / this.subcategoriesPerPage);
    },
  },
});
