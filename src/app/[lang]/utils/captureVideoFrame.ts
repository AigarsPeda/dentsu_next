const captureVideoFrame = (
  url: string | null,
  time: number
): Promise<string> => {
  if (!url) return Promise.resolve("");

  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    video.src = url;
    video.crossOrigin = "anonymous"; // Ensure CORS is allowed if necessary
    video.muted = true; // Prevent autoplay blocking
    video.load();

    video.addEventListener("loadeddata", () => {
      video.currentTime = time; // Seek to desired time (0 for first frame, 1 for second frame)
    });

    video.addEventListener("seeked", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const imageDataUrl = canvas.toDataURL("image/png");
      resolve(imageDataUrl); // Return the image as a Base64 string
    });

    video.addEventListener("error", (err) => reject(err));
  });
};

export default captureVideoFrame;
