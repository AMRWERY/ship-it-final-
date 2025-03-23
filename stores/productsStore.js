import {
  getDocs,
  collection,
  query,
  getDoc,
  doc,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    selectedProduct: null,
    paginatedProducts: [],
    currentPage: 1,
    productsPerPage: 10,
    productRatings: {},
  }),

  actions: {
    fetchProducts() {
      getDocs(query(collection(db, "products")))
        .then((querySnap) => {
          const allProducts = querySnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.products = allProducts;
          // console.log(this.products);
          this.updatePagination();
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },

    createProduct(productData, imageFiles) {
      if (!imageFiles || imageFiles.length < 1) {
        // console.error("At least one image file is required.");
        return Promise.reject("No image files provided.");
      }
      const imageUrls = [];
      const uploadPromises = imageFiles.map((file) => {
        const storagePath = "/products/" + file.name;
        const storageRef = ref(storage, storagePath);
        return uploadBytes(storageRef, file)
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then((url) => {
            imageUrls.push(url);
          });
      });
      return Promise.all(uploadPromises)
        .then(() => {
          const imageUrlsObj = imageUrls.reduce((acc, url, index) => {
            acc[`imageUrl${index + 1}`] = url;
            return acc;
          }, {});
          const newProductData = { ...productData, ...imageUrlsObj };
          return addDoc(collection(db, "products"), newProductData);
        })
        .then(() => {
          this.updatePagination();
        })
        .catch((error) => {
          // console.error("Error adding product:", error);
          throw error;
        });
    },

    updateProduct(productId, updatedData) {
      const productRef = doc(db, "products", productId);
      // updateDoc(productRef, updatedData)
      return updateDoc(productRef, updatedData)
        .then(() => {
          const index = this.products.findIndex(
            (product) => product.id === productId
          );
          if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedData };
          }
        })
        .catch((error) => {
          // console.error("Error updating product:", error);
          return error;
        });
    },

    deleteProduct(productId) {
      if (!productId) return;
      const productRef = doc(db, "products", productId);
      deleteDoc(productRef)
        .then(() => {
          this.products = this.products.filter(
            (product) => product.id !== productId
          );
          this.updatePagination();
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    },

    fetchProductsByBrand(brandName) {
      if (!brandName) return;
      const formattedBrand = brandName.replace(/_/g, " ");
      getDocs(
        query(collection(db, "products"), where("brand", "==", formattedBrand))
      )
        .then((querySnap) => {
          const filteredProducts = querySnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.products = filteredProducts;
        })
        .catch((error) => {
          console.error("Error fetching products by brand:", error);
        });
    },

    fetchProductsByCategory(categoryId) {
      if (!categoryId) return;
      return this.products.filter((prod) => prod.categoryId == categoryId);
    },
    async fetchProductsByCategories(categoryIds) {
      if (!categoryIds?.length) {
        this.fetchProducts();
        return;
      }
      try {
        // console.log("Querying Firestore for category IDs:", categoryIds);
        const stringCategoryIds = categoryIds.map((id) => String(id));
        const q = query(
          collection(db, "products"),
          where("categoryId", "in", stringCategoryIds)
        );
        const querySnap = await getDocs(q);
        this.products = (querySnap?.docs || []).map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log("Fetched products:", this.products);
        // console.log("Firestore returned:", querySnap.docs);
      } catch (error) {
        console.error("Error fetching products by categories:", error);
      }
    },

    fetchProductDetail(productId) {
      if (!productId) return null;
      const docRef = doc(db, "products", productId);
      return getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const product = { ...docSnap.data(), id: productId };
            this.selectedProduct = product;
            return product;
          } else {
            this.selectedProduct = null;
            return null;
          }
        })
        .catch((error) => {
          return null;
        });
    },

    async addProductComment(productId, commentText) {
      try {
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, { userComment: commentText });
        if (this.selectedProduct) {
          this.selectedProduct.userComment = commentText;
        }
        return true;
      } catch (error) {
        return false;
      }
    },

    updatePagination() {
      this.paginatedProducts = this.products.slice(
        (this.currentPage - 1) * this.productsPerPage,
        this.currentPage * this.productsPerPage
      );
    },

    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    },

    async fetchProductRating(productId) {
      if (!productId) return;
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const data = productSnap.data();
        this.productRatings[productId] = {
          rating: data.rating || 0,
          totalVotes: data.totalVotes || 0,
        };
      }
    },

    async updateProductRating(productId, newRating) {
      if (!productId || !newRating) return;
      if (!this.productRatings) {
        this.productRatings = {};
      }
      if (!this.productRatings[productId]) {
        this.productRatings[productId] = { rating: 0, totalVotes: 0 };
      }
      const previousTotalVotes = this.productRatings[productId].totalVotes || 0;
      const previousRating = this.productRatings[productId].rating || 0;
      const newTotalVotes = previousTotalVotes + 1;
      const updatedRating =
        (previousRating * previousTotalVotes + newRating) / newTotalVotes;
      const roundedRating = Math.round(updatedRating * 100) / 100;
      this.productRatings[productId] = {
        rating: roundedRating,
        totalVotes: newTotalVotes,
      };
      this.productRatings[productId] = {
        rating: updatedRating,
        totalVotes: newTotalVotes,
      };
      try {
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, {
          rating: updatedRating,
          totalVotes: newTotalVotes,
        });
      } catch (error) {
        console.error("Error updating rating:", error);
      }
    },
  },

  getters: {
    inStockProducts() {
      return this.products.filter(
        (product) => product.availability === "In stock"
      ).length;
    },

    totalPages() {
      return Math.ceil(this.products.length / this.productsPerPage);
    },
  },
});
