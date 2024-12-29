export const useNavigateBack = () => {
    const router = useRouter();

    const navigateBack = async () => {
        if (window.history.length > 1) {
            await router.back();
          } else if (document.referrer) {
            window.location.href = document.referrer;
          } else {
            await router.push('/');
          }
    };

    return {
      navigateBack,
    };
  };
  