import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase";

export const useTodayDealStore = defineStore("today-deals", {
  state: () => ({
    products: [],
    currentDeal: null,
    nextDeals: [],
    cart: [],
  }),

  actions: {
    fetchDeals() {
      const dealsRef = collection(db, "today-deal");
      const dealsQuery = query(dealsRef, orderBy("startTime"));
      let unsubscribe = null;
      const promise = new Promise((resolve, reject) => {
        unsubscribe = onSnapshot(
          dealsQuery,
          (snapshot) => {
            this.products = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            this.setActiveDeal();
            this.setNextDeals();
            resolve();
          },
          (error) => {
            console.error("Error fetching deals:", error);
            reject(error);
          }
        );
      });
      onUnmounted(() => {
        if (unsubscribe) unsubscribe();
      });
      return promise;
    },

    setActiveDeal() {
      const now = new Date();
      const activeDeal = this.products.find(
        (product) =>
          new Date(product.startTime.seconds * 1000) <= now &&
          new Date(product.endTime.seconds * 1000) > now
      );
      this.currentDeal = activeDeal || null;
    },

    setNextDeals() {
      const now = new Date();
      this.nextDeals = this.products.filter(
        (product) => new Date(product.startTime.seconds * 1000) > now
      );
      // console.log('next deal', this.nextDeals)
    },

    startDealTimer() {
      setInterval(() => {
        this.setActiveDeal();
        this.setNextDeals();
      }, 1000);
    },

    addNewDeal(dealData, imageFiles) {
      if (!imageFiles || imageFiles.length < 1) {
        return Promise.reject(
          new Error("At least one image file is required.")
        );
      }
      const imageUploadPromises = imageFiles.map((imageFile) => {
        const storagePath = "/deals/" + imageFile.name;
        const storageRef = ref(storage, storagePath);
        return uploadBytes(storageRef, imageFile).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        );
      });
      return Promise.all(imageUploadPromises)
        .then((imageUrls) => {
          const imageUrlsObj = imageUrls.reduce((acc, url, index) => {
            acc[`imageUrl${index + 1}`] = url;
            return acc;
          }, {});
          const newDeal = {
            ...dealData,
            ...imageUrlsObj,
          };
          const dealsRef = collection(db, "today-deal");
          return addDoc(dealsRef, newDeal);
        })
        .then(() => this.fetchDeals())
        .then(() => true)
        .catch((error) => {
          console.error("Error adding new deal:", error);
          return false;
        });
    },

    async addToCart(item) {
      const authStore = useAuthStore();
      const uid = authStore.user?.uid;
      if (!uid) {
        throw new Error("User not authenticated or uid not available");
      }
      try {
        const existingIndex = this.cart.findIndex(
          (cartItem) =>
            cartItem.productId === item.id &&
            cartItem.color === item.selectedColor &&
            cartItem.size === item.selectedSize &&
            cartItem.uid === uid
        );
        if (existingIndex !== -1) {
          this.cart[existingIndex].quantity += item.quantity;
        } else {
          const product = {
            docId: Date.now().toString(),
            productId: item.id,
            title: item.title,
            titleAr: item.titleAr,
            discountedPrice: item.discountedPrice,
            originalPrice: item.originalPrice,
            imageUrl1: item.imageUrl1,
            brand: item.brand,
            brandAr: item.brandAr,
            discount: item.discount,
            quantity: item.quantity,
            color: item.selectedColor,
            size: item.selectedSize,
            uid,
          };
          this.cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(this.cart));
        return { success: true };
      } catch (error) {
        console.error("Error adding deal to cart:", error);
        throw error;
      }
    },
  },
});
