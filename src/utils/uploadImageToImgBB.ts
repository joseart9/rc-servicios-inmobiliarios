import { v4 as uuidv4 } from "uuid";

export interface ImageUploadProps {
  id: string;
  file?: File;
  url?: string;
  pos?: number;
  uploaded?: boolean;
}

export async function uploadImagesToImgBB(
  images: ImageUploadProps[]
): Promise<ImageUploadProps[]> {
  const apiKey = process.env.NEXT_PUBLIC_IMG_BB_KEY;

  if (!apiKey) {
    throw new Error("API key is missing");
  }

  // Procesar cada imagen
  const uploadPromises = images.map(async (image) => {
    if (!image.uploaded && image.file) {
      try {
        // Leer el archivo y convertirlo a base64
        const base64Image = await readFileAsBase64(image.file);

        const formData = new FormData();
        formData.append("key", apiKey);
        formData.append("image", base64Image);

        const response = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error en la carga de imagen:", errorData);
          throw new Error(
            `Error al subir la imagen a ImgBB: ${errorData.error.message}`
          );
        }

        const data = await response.json();
        const imgURL = data.data.url;

        // Actualizar el objeto ImageUploadProps
        return {
          ...image,
          url: imgURL,
          uploaded: true,
          file: undefined, // Liberar memoria eliminando el archivo
        };
      } catch (error) {
        console.error(`Error en la carga de imagen con id ${image.id}:`, error);
        throw error;
      }
    } else {
      // Si la imagen ya está subida o no tiene archivo, devolver el objeto tal cual
      return image;
    }
  });

  // Esperar a que todas las promesas se resuelvan
  const updatedImages = await Promise.all(uploadPromises);
  return updatedImages;
}

// Función para leer el archivo y convertirlo a base64
function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      // Remover el prefijo data:*/*;base64, si existe
      const base64String = result.split(",")[1] || result;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
