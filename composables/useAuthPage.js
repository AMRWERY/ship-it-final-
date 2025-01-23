export const useAuthPage = () => {
  const route = useRoute();

  const isAuthPage = computed(() =>
    ["/sign-up", "/dashboard/login"].includes(route.path)
  );

  return { isAuthPage };
};
