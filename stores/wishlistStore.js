export const useWishlistStore = defineStore("wishlist", {
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
        this.loading = false;
        return;
      }
      try {
        const storedWishlist = localStorage.getItem(`wishlist_${userId}`);
        this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      } catch (error) {
        console.error("Error fetching wishlist from localStorage:", error);
        this.wishlist = [];
      } finally {
        this.loading = false;
      }
    },

    addToWishlist(id, title, discountedPrice, originalPrice, brand, imageUrl1) {
      const authStore = useAuthStore();
      const userId = authStore.user?.uid;
      if (!userId) {
        throw new Error("User not authenticated");
      }
      if (this.wishlist.some((item) => item.productId === id)) {
        throw new Error("Item already added to the wishlist.");
      }
      const newItem = {
        docId: Date.now().toString(),
        productId: id,
        title,
        discountedPrice,
        originalPrice,
        brand,
        imageUrl1,
        userId,
      };
      this.wishlist.push(newItem);
      this.persistWishlist(userId);
    },

    removeFromWishlist(docId) {
      const authStore = useAuthStore();
      const userId = authStore.user?.uid;
      if (!userId) return;
      this.wishlist = this.wishlist.filter((item) => item.docId !== docId);
      this.persistWishlist(userId);
    },

    persistWishlist(userId) {
      try {
        localStorage.setItem(
          `wishlist_${userId}`,
          JSON.stringify(this.wishlist)
        );
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
    },
  },

  getters: {
    isInWishlist: (state) => (productId) => {
      return state.wishlist.some((item) => item.productId === productId);
    },
  },
});
