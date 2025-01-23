import { defineStore } from "pinia";
import {
  getDocs,
  collection,
  query,
  getDoc,
  doc,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

export const useProductsStore = defineStore("new-products", {
  state: () => ({
    products: [],
    selectedProduct: null,
    paginatedProducts: [],
    currentPage: 1,
    productsPerPage: 10,
  }),

  actions: {
    // async fetchProducts() {
    //   try {
    //     const querySnap = await getDocs(query(collection(db, "products")));
    //     const allProducts = querySnap.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     this.products = allProducts;
    //     // console.log(this.products);
    //     this.updatePagination();
    //   } catch (error) {
    //     console.error("Error fetching products:", error);
    //   }
    // },
    fetchProducts() {
      getDocs(query(collection(db, "products")))
        .then((querySnap) => {
          const allProducts = querySnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.products = allProducts;
          this.updatePagination();
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    },

    // async createProduct(productData, imageFiles) {
    //   try {
    //     if (!imageFiles || imageFiles.length < 1) {
    //       throw new Error("At least one image file is required.");
    //     }
    //     const imageUrls = [];
    //     for (let i = 0; i < imageFiles.length; i++) {
    //       const imageFile = imageFiles[i];
    //       const storagePath = "/products/" + imageFile.name;
    //       const storageRef = ref(storage, storagePath);
    //       const snapshot = await uploadBytes(storageRef, imageFile);
    //       const imageUrl = await getDownloadURL(snapshot.ref);
    //       imageUrls.push(imageUrl);
    //     }
    //     const imageUrlsObj = imageUrls.reduce((acc, url, index) => {
    //       acc[`imageUrl${index + 1}`] = url;
    //       return acc;
    //     }, {});
    //     const productRef = collection(db, "products");
    //     const newProductData = { ...productData, ...imageUrlsObj };
    //     await addDoc(productRef, newProductData);
    //     this.updatePagination();
    //   } catch (error) {
    //     console.error("Error adding product: ", error);
    //     throw error;
    //   }
    // },
    createProduct(productData, imageFiles) {
      if (!imageFiles || imageFiles.length < 1) {
        // console.error("At least one image file is required.");
        return;
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
      Promise.all(uploadPromises)
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
          console.error("Error adding product:", error);
        });
    },

    updateProduct(productId, updatedData) {
      const productRef = doc(db, "products", productId);
      updateDoc(productRef, updatedData)
        .then(() => {
          const index = this.products.findIndex(
            (product) => product.id === productId
          );
          if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedData };
          }
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    },
    // async updateProduct(productId, updatedData) {
    //   try {
    //     const productRef = doc(db, "products", productId);
    //     await updateDoc(productRef, updatedData);

    //     if (this.products && Array.isArray(this.products)) {
    //       const index = this.products.findIndex(
    //         (product) => product.id === productId
    //       );
    //       if (index !== -1) {
    //         this.products[index] = { ...this.products[index], ...updatedData };
    //       }
    //     }
    //     // console.log("Product updated successfully!");
    //   } catch (error) {
    //     console.error("Error updating product:", error);
    //   }
    // },

    deleteProduct(productId) {
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
    // async deleteProduct(productId) {
    //   try {
    //     const productRef = doc(db, "products", productId);
    //     await deleteDoc(productRef);
    //     if (this.products && Array.isArray(this.products)) {
    //       this.products = this.products.filter(
    //         (product) => product.id !== productId
    //       );
    //     } else {
    //       // console.warn("Products array is not properly initialized");
    //     }
    //     // console.log("Product deleted successfully");
    //     this.updatePagination();
    //   } catch (error) {
    //     console.error("Error deleting product:", error);
    //     throw new Error("Failed to delete the product. Please try again.");
    //   }
    // },

    fetchProductsByBrand(brandName) {
      if (!brandName) {
        // console.error("Brand name is required to fetch products by brand.");
        return;
      }
      getDocs(
        query(collection(db, "products"), where("brand", "==", brandName))
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
    // async fetchProductsByBrand(brandName) {
    //   if (!brandName) {
    //     // console.log("Brand name is required to fetch products by brand");
    //     return;
    //   }
    //   try {
    //     const querySnap = await getDocs(
    //       query(collection(db, "products"), where("brand", "==", brandName))
    //     );
    //     const filteredProducts = querySnap.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     this.products = filteredProducts;
    //   } catch (error) {
    //     console.error("Error fetching products by brand:", error);
    //   }
    // },

    fetchProductsByCategory(catId) {
      if (!catId) {
        // console.error("Category ID is required to fetch products by category.");
        return;
      }
      getDocs(query(collection(db, "products"), where("catId", "==", catId)))
        .then((querySnap) => {
          const filteredProducts = querySnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.products = filteredProducts;
        })
        .catch((error) => {
          console.error("Error fetching products by category:", error);
        });
    },
    // async fetchProductsByCategory(catId) {
    //   if (!catId) {
    //     // console.log("Category ID is required to fetch products by category");
    //     return;
    //   }
    //   try {
    //     const querySnap = await getDocs(
    //       query(collection(db, "products"), where("catId", "==", catId))
    //     );
    //     const filteredProducts = querySnap.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     this.products = filteredProducts;
    //     // console.log('products', this.products)
    //   } catch (error) {
    //     console.error("Error fetching products by category:", error);
    //   }
    // },

    fetchProductDetail(productId) {
      if (!productId) {
        // console.error("Product ID is missing or invalid.");
        return null;
      }
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
          // console.error("Error fetching product details:", error);
          return null;
        });
    },
    // async fetchProductDetail(productId) {
    //   if (!productId) {
    //     // console.error("Product ID is missing or invalid");
    //     return null;
    //   }
    //   try {
    //     const docRef = doc(db, "products", productId);
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap.exists()) {
    //       const product = { ...docSnap.data(), id: productId };
    //       this.selectedProduct = product;
    //       return product;
    //     } else {
    //       // console.error("No product found for ID:", productId);
    //       this.selectedProduct = null;
    //       return null;
    //     }
    //   } catch (error) {
    //     console.error("Error fetching product details:", error);
    //     return null;
    //   }
    // },

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
