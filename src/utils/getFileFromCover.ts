import { storage } from "../services/firebase";
import { ref, getDownloadURL } from "firebase/storage";

export async function getFileFromCover(cover: string): Promise<File> {
  const coverRef = ref(storage, cover);
  const filename = cover.split('/').pop();
  const coverUrl = await getDownloadURL(coverRef);

  const response = await fetch(coverUrl);
  const blob: any = await response.blob();

  blob.lastModifiedDate = new Date();
  blob.name = filename;

  return blob as File;
}