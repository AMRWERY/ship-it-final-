export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: [],
    loading: false,
    storedUser: JSON.parse(localStorage.getItem("user")),
  }),

  actions: {
    fetchWishlist() {
      this.loading = true;
      const userId = this.storedUser?.uid;
      if (!userId) {
        this.loading = false;
        return Promise.resolve();
      }
      return Promise.resolve(localStorage.getItem("wishlist"))
        .then((storedWishlist) => {
          this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
        })
        .catch((error) => {
          console.error("Error fetching wishlist from localStorage:", error);
          this.wishlist = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },

    addToWishlist(wishlistItems) {
      const {
        id,
        title,
        titleAr,
        discountedPrice,
        originalPrice,
        brand,
        brandAr,
        imageUrl1,
        selectedColor,
        selectedSize,
      } = wishlistItems;
      const userId = this.storedUser?.uid;
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
        titleAr,
        discountedPrice,
        originalPrice,
        brand,
        brandAr,
        imageUrl1,
        selectedColor,
        selectedSize,
        userId,
      };
      this.wishlist.push(newItem);
      this.persistWishlist(userId);
    },

    removeFromWishlist(docId) {
      const userId = this.storedUser?.uid;
      if (!userId) return;
      this.wishlist = this.wishlist.filter((item) => item.docId !== docId);
      this.persistWishlist(userId);
    },

    persistWishlist(userId) {
      try {
        localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
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
