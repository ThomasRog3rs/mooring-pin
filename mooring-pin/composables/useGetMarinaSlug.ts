export const useGetMarinaSlug = () => {
    const getMarinaSlug = (marinaName : string) => {
        marinaName = marinaName.toLowerCase();
        return marinaName.replaceAll(" ", "-");
    }
  
    return {
        getMarinaSlug,
    };
  };
    