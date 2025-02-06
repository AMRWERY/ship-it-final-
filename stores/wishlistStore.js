import { db } from "@/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

export const useWishlistStore = defineStore("wishlistStore", {
  state: () => ({
    wishlist: [],
    loading: false,
  }),

  actions: {
    fetchWishlist() {
      this.loading = true;
      const authStore = useAuthStore();
      const userId = authStore.user?.uid;
      if (!userId) {
        // console.error("User ID not found. Cannot fetch wishlist.");
        this.loading = false;
        return;
      }
      const wishlistQuery = query(
        collection(db, "wishlist"),
        where("userId", "==", userId)
      );
      getDocs(wishlistQuery)
        .then((querySnapshot) => {
          this.wishlist = querySnapshot.docs.map((doc) => ({
            docId: doc.id,
            productId: doc.data().id,
            title: doc.data().title,
            discountedPrice: doc.data().discountedPrice,
            originalPrice: doc.data().originalPrice,
            brand: doc.data().brand,
            imageUrl1: doc.data().imageUrl1,
          }));
          // console.log("Fetched wishlist:", this.wishlist);
        })
        .catch((error) => {
          console.error("Error fetching wishlist:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    addToWishlist(id, title, discountedPrice, originalPrice, brand, imageUrl1) {
      if (this.wishlist.some((item) => item.productId === id)) {
        throw new Error("Item already added to the wishlist.");
      }
      const authStore = useAuthStore();
      const userId = authStore.user?.uid;
      if (!userId) {
        // console.error("User ID not found. Cannot add to wishlist.");
        return;
      }
      const product = {
        id,
        title,
        discountedPrice,
        originalPrice,
        brand,
        imageUrl1,
        userId,
      };
      addDoc(collection(db, "wishlist"), product)
        .then((docRef) => {
          this.wishlist.push({ docId: docRef.id, productId: id, ...product });
          // console.log("Product added to wishlist:", product);
        })
        .catch((error) => {
          console.error("Error adding to wishlist:", error);
        });
    },

    removeFromWishlist(docId) {
      const docRef = doc(db, "wishlist", docId);
      deleteDoc(docRef)
        .then(() => {
          // console.log("Item deleted successfully.");
          this.wishlist = this.wishlist.filter((item) => item.docId !== docId);
          // console.log("Updated wishlist:", this.wishlist);
        })
        .catch((error) => {
          console.error("Error removing from wishlist:", error);
        });
    },
  },

  getters: {
    isInWishlist: (state) => (productId) => {
      return state.wishlist.some((item) => item.productId === productId);
    },
  },
});
