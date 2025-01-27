import { defineStore } from "pinia";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    isLoading: false,
  }),

  actions: {
    fetchCart() {
      this.isLoading = true;
      const authStore = useAuthStore();
      const uid = authStore.user?.uid;
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          this.cart = JSON.parse(savedCart);
        } catch (error) {
          // console.error("Error parsing saved cart data", error);
          this.cart = [];
        }
      }
      if (!uid) {
        this.cart = [];
        this.isLoading = false;
        return;
      }
      const cartRef = collection(db, "cart");
      const cartQuery = query(cartRef, where("uid", "==", uid));
      getDocs(cartQuery)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // console.log("No cart data found for this user.");
          }
          this.cart = querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            ...doc.data(),
            quantity: doc.data().quantity || 1,
          }));
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async addToCart(
      id,
      title,
      discountedPrice,
      originalPrice,
      imageUrl1,
      brand,
      discount,
      quantity
    ) {
      const authStore = useAuthStore();
      const uid = authStore.user?.uid;
      if (!uid) {
        // console.error("User is not authenticated or UID is missing.");
        return;
      }
      if (this.cart.length === 0) {
        this.fetchCart();
      }
      const existingProduct = this.cart.find(
        (item) => item.productId === id && item.uid === uid
      );
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);
      if (!productSnap.exists()) {
        // console.error("Product not found.");
        return;
      }
      const productData = productSnap.data();
      const stock = productData.stock || 0;
      if (quantity > stock) {
        // console.error("Not enough stock available.");
        return;
      }
      const newStock = stock - quantity;
      try {
        await updateDoc(productRef, { stock: newStock });
        // console.log("Stock updated successfully.");
      } catch (error) {
        // console.error("Error updating stock:", error);
        return;
      }
      if (existingProduct) {
        try {
          const docRef = doc(db, "cart", existingProduct.docId);
          const newQuantity = (existingProduct.quantity || 0) + quantity;
          await updateDoc(docRef, { quantity: newQuantity });
          existingProduct.quantity = newQuantity;
          // console.log("Product quantity updated in Firestore.");
        } catch (error) {
          console.error("Error updating product quantity in Firestore:", error);
        }
      } else {
        const product = {
          productId: id,
          title,
          discountedPrice,
          originalPrice,
          imageUrl1,
          brand,
          discount,
          quantity: quantity || 1,
          uid,
        };
        try {
          const docRef = await addDoc(collection(db, "cart"), product);
          this.cart.push({
            docId: docRef.id,
            ...product,
          });
          // console.log("Product added to Firestore:", docRef.id);
        } catch (error) {
          console.error("Error adding new product to Firestore:", error);
        }
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
      // console.log("Cart updated in localStorage:", this.cart);
    },

    updateQuantityInCart(productId, newQuantity) {
      const product = this.cart.find((item) => item.productId === productId);
      if (!product) return;
      const docRef = doc(db, "cart", product.docId);
      updateDoc(docRef, { quantity: newQuantity })
        .then(() => {
          product.quantity = newQuantity;
          const productRef = doc(db, "products", productId);
          return getDoc(productRef).then((productSnap) => {
            if (productSnap.exists()) {
              const productData = productSnap.data();
              const stock = productData.stock;
              if (newQuantity <= stock) {
                const stockUpdate = stock - newQuantity;
                return updateDoc(productRef, { stock: stockUpdate });
              } else {
                console.error("Not enough stock available");
              }
            }
          });
        })
        .catch((error) => {
          console.error("Error updating product quantity in Firestore:", error);
        });
    },

    removeFromCart(docId) {
      if (!docId) return;
      const docRef = doc(db, "cart", docId);
      deleteDoc(docRef)
        .then(() => {
          if (Array.isArray(this.cart)) {
            this.cart = this.cart.filter((item) => item.docId !== docId);
          } else {
            console.error("Cart is not an array:", this.cart);
          }
        })
        .catch((error) => {
          console.error("Error removing from cart:", error);
        });
    },

    clearCart() {
      const cartRef = collection(db, "cart");
      getDocs(cartRef)
        .then((querySnapshot) => {
          const deletePromises = querySnapshot.docs.map((doc) =>
            deleteDoc(doc.ref)
          );
          return Promise.all(deletePromises);
        })
        .then(() => {
          this.cart = [];
        })
        .catch((error) => {
          console.error("Error clearing cart from Firestore:", error);
        });
    },
  },

  getters: {
    isInCart: (state) => (productId) => {
      return state.cart.some((item) => item.productId === productId);
    },
  },
});
