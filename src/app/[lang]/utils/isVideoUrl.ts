const isVideoUrl = (url: string | null): boolean => {
  if (!url) return false;

  if (url.includes(".mp4")) {
    return true;
  }

  if (url.includes(".mpeg")) {
    return true;
  }

  if (url.includes(".quicktime")) {
    return true;
  }

  if (url.includes(".wmv")) {
    return true;
  }

  if (url.includes(".avi")) {
    return true;
  }

  if (url.includes(".flv")) {
    return true;
  }

  if (url.includes(".mov")) {
    return true;
  }

  return false;
};

export default isVideoUrl;
