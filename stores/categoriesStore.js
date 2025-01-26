import { defineStore } from "pinia";
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

export const useCategoriesStore = defineStore("categoriesStore", {
  state: () => ({
    categories: [],
    subCategories: [],
    paginatedCategories: [],
    paginatedSubcategories: [],
    currentPage: 1,
    categoriesPerPage: 4,
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

    // async fetchCategoriesByRange(minId, maxId) {
    //   try {
    //     const categoriesQuery = query(
    //       collection(db, "categories"),
    //       where("catId", ">=", minId),
    //       where("catId", "<=", maxId)
    //     );
    //     const querySnapshot = await getDocs(categoriesQuery);
    //     this.categories = querySnapshot.docs.map((doc) => doc.data());
    //     // console.log(this.categories)
    //   } catch (error) {
    //     console.error("Error fetching categories:", error);
    //   }
    // },

    fetchCategoriesByRange(minId, maxId) {
      const categoriesQuery = query(
        collection(db, "categories"),
        where("catId", ">=", minId),
        where("catId", "<=", maxId)
      );
      getDocs(categoriesQuery)
        .then((querySnapshot) => {
          this.categories = querySnapshot.docs.map((doc) => doc.data());
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },

    // async fetchCategoryDetails(categoryId) {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "categories"));
    //     const category = querySnapshot.docs
    //       .map((doc) => ({ id: doc.id, ...doc.data() }))
    //       .find((cat) => cat.id === categoryId);
    //     if (category) {
    //       this.currentCategory = category;
    //     } else {
    //       console.error(`Category with ID ${categoryId} not found.`);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching category details:", error);
    //   }
    // },

    // async updateCategory(categoryId, updatedData) {
    //   try {
    //     const categoryDoc = doc(db, "categories", categoryId);
    //     await updateDoc(categoryDoc, updatedData);
    //   } catch (error) {
    //     // console.error("Error updating category:", error);
    //     throw error;
    //   }
    // },

    // async addCategory(title, imageFile) {
    //   try {
    //     const storage = getStorage();
    //     const storagePath = "/categories/" + imageFile.name;
    //     const storageRef = ref(storage, storagePath);
    //     const snapshot = await uploadBytes(storageRef, imageFile);
    //     const imageUrl = await getDownloadURL(snapshot.ref);
    //     const querySnapshot = await getDocs(collection(db, "categories"));
    //     const categories = querySnapshot.docs.map((doc) => doc.data());
    //     const maxId =
    //       categories.length > 0
    //         ? Math.max(...categories.map((cat) => cat.catId || 0))
    //         : 0;
    //     const newId = maxId + 1;
    //     const docRef = await addDoc(collection(db, "categories"), {
    //       catId: newId,
    //       title,
    //       imgOne: imageUrl,
    //     });
    //     const newCategory = { id: newId, title, imgOne: imageUrl };
    //     this.categories.push(newCategory);
    //     // console.log("Category added successfully:", newCategory);
    //   } catch (error) {
    //     console.error("Error adding category:", error);
    //   }
    // },
    addCategory(title, imageFile) {
      const storage = getStorage();
      const storagePath = "/categories/" + imageFile.name;
      const storageRef = ref(storage, storagePath);
      uploadBytes(storageRef, imageFile)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((imageUrl) => {
          getDocs(collection(db, "categories"))
            .then((querySnapshot) => {
              const categories = querySnapshot.docs.map((doc) => doc.data());
              const maxId =
                categories.length > 0
                  ? Math.max(...categories.map((cat) => cat.catId || 0))
                  : 0;
              const newId = maxId + 1;
              addDoc(collection(db, "categories"), {
                catId: newId,
                title,
                imgOne: imageUrl,
              })
                .then(() => {
                  const newCategory = { id: newId, title, imgOne: imageUrl };
                  this.categories.push(newCategory);
                })
                .catch((error) => {
                  console.error("Error adding category:", error);
                });
            })
            .catch((error) => {
              console.error("Error fetching categories:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    },

    // async deleteCategory(categoryId) {
    //   try {
    //     const categoryDoc = doc(db, "categories", categoryId);
    //     await deleteDoc(categoryDoc);
    //     this.categories = this.categories.filter(
    //       (category) => category.id !== categoryId
    //     );
    //     this.updatePagination();
    //   } catch (error) {
    //     console.error("Error deleting category:", error);
    //   }
    // },

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
    // async fetchSubCategories() {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "subCategories"));
    //     this.subCategories = querySnapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     this.updatePagination();
    //   } catch (error) {
    //     console.error("Error fetching subcategories:", error);
    //   }
    // },

    updatePagination() {
      this.paginatedCategories = this.categories.slice(
        (this.currentPage - 1) * this.categoriesPerPage,
        this.currentPage * this.categoriesPerPage
      );
      // this.paginatedSubcategories = this.subCategories.slice(
      //   (this.currentPage - 1) * this.subcategoriesPerPage,
      //   this.currentPage * this.subcategoriesPerPage
      // );
    },

    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    },
  },

  getters: {
    // getSubCategoriesByCategory: (state) => (categoryId) => {
    //   return state.subCategories.filter(
    //     (subCategory) => subCategory.categoryId === categoryId
    //   );
    // },

    totalPages() {
      return Math.ceil(this.categories.length / this.categoriesPerPage);
    },

    totalPagesSubcategory() {
      return Math.ceil(this.categories.length / this.subcategoriesPerPage);
    },
  },
});
