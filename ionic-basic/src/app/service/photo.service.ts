import { Injectable } from '@angular/core';
import { UserPhoto } from '../shared/user-photo.model';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  constructor(private platform: Platform) { }
  public async loadSaved() {
    // Recupera datos de arreglod de fotos de caché
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    // Si el proyecto corre en la web
    if (!this.platform.is('hybrid')) {
      //Mostrar foto leyendo en formato base64
      for (let photo of this.photos) {
        //Lee los datos de cada foto guardada en el sistema de archivos
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        //Solo en plataforma web: cargar fotos como datos base64
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  /* Utilizar: la camara para tomar una foto: 
  // https://capacitor.ionicframework.com/docs/apis/camera
  // Almacenar los datos de la foto de manera permanente en almacenamiento de archivos
  // https://capacitor.ionicframework.com/docs/apis/filesystem
  // Almacenar una referencia a todos los caminos de las fotos utilizando la API Sotrage
  // https://capacitor.ionicframework.com/docs/apis/storage
  */
  public async addNewToGallery() {
    //Tomar una foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // datos basados en archivo; mejor rendimiento
      source: CameraSource.Camera, //Automaticamente toma una nueva foto con la camara
      quality: 100, // calidad más alta (0 a 100)
    });

    const savedImageFile = await this.savePicture(capturedPhoto);

    //Añadir nueva foto al arreglo de fotos
    this.photos.unshift(savedImageFile);

    //Almacenar en cache todos los datos de las fotot para recuperar en un futuro
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }

  //Guardar foto como archivo en el dispositivo
  private async savePicture(cameraPhoto: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      };
    }
  }

  // Read camera photo into base64 format based on the platform the app is running on
  private async readAsBase64(cameraPhoto: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      //Leer el archivo en formato base64
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });

      return file.data;
    } else {
      //Buscar la foto, leer como blob, y convertirla a formate base64
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }
  //Borrar una foto eliminandola de los datos de referencia y del sistema
  public async deletePicture(photo: UserPhoto, position: number) {
    //Eliminar esta foto del arreglo de referencia de datos de fotos
    this.photos.splice(position, 1);

    //Actualizar cache de arreglo de fotos sobreescribiendo el arreglo de fotos existente
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
    //Borrar archivo de foto del sistema
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}