import imageCompression from "browser-image-compression";

export async function compressToWebP(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    fileType: "image/webp",
    useWebWorker: true,
  };

  const compressedBlob = await imageCompression(file, options);

  // convert Blob → File
  const webpFile = new File(
    [compressedBlob],
    file.name.replace(/\.\w+$/, ".webp"),
    { type: "image/webp" },
  );

  return webpFile;
}
