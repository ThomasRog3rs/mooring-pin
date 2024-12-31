export const useNavigateBack = () => {
  const router = useRouter();

  const navigateBack = async () => {
    if (window.history.length > 1) {
      await router.back();
    } else {
      await router.push('/');
    }
    // else if (document.referrer) {
    //   window.location.href = document.referrer; //maybe we can use document.referrer to track where users come from
    // } 
  };

  return {
    navigateBack,
  };
};
  