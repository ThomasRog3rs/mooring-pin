export const useCopyUrlToClipBoard = () => {

  const copyUrlToClipBoard = async (): Promise<boolean> => {
    const currentUrl = window.location.href;
  
    try {
      await navigator.clipboard.writeText(currentUrl);
      return true;
    } catch (err) {
      // Log error if the copy failed
      console.error('Failed to copy URL: ', err);
      return false; // Return false if there was an error
    }
  };

  return {
    copyUrlToClipBoard,
  };
};
  