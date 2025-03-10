import {
  collection,
  getDocs,
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
      return getDocs(dealsQuery)
        .then((snapshot) => {
          this.products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setActiveDeal();
          this.setNextDeals();
        })
        .catch((error) => {
          console.error("Error fetching deals:", error);
        });
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

    async addToCart(deal, quantity) {
      const authStore = useAuthStore();
      const uid = authStore.user?.uid;
      if (!uid) {
        throw new Error("User not authenticated or uid not available");
      }
      try {
        const existingIndex = this.cart.findIndex(
          (item) => item.productId === deal.id && item.uid === uid
        );
        if (existingIndex !== -1) {
          this.cart[existingIndex].quantity += quantity;
        } else {
          const product = {
            productId: deal.id,
            title: deal.title,
            discountedPrice: deal.discountedPrice,
            originalPrice: deal.originalPrice,
            imageUrl1: deal.imageUrl1,
            brand: deal.brand,
            discount: deal.discount,
            quantity,
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
