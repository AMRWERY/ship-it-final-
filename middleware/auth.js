export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  // For client-side navigation
  if (process.client) {
    await authStore.initialize();
  }

  if (!isAuthenticated.value) {
    return navigateTo(
      `/auth/login?redirect=${encodeURIComponent(to.fullPath)}`
    );
  }
});
