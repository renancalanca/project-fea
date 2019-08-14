import { Component } from '@angular/core';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx'
import { ActionSheetController } from '@ionic/angular';
import * as Tesseract from 'tesseract.js'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedImage: string;
  imageText: string;

  constructor(private camera: Camera, private actionSheetCtrl: ActionSheetController) { }
  
  async selectSource() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use library',
          handler: () => {
            console.log('use library');
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      //this.selectedImage = 'data:image/jpeg;base64,${imageData}';
      let base64image = 'data:image/jpeg;base64,' + imageData;
      this.selectedImage = base64image;
    });

  }

  recognizeImage() {
    // Tesseract.recognize(this.selectedImage)
    Tesseract.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png')
      .progress(message => {
        // if (message.status === 'recognizing text')
        // this.progress.set(message.progress);
        console.log('progress', message);
      })
      .catch(err => console.error(err))
      .then(result => {
        this.imageText = result.text;
        console.log(result.text);
      })
      .finally(resultOrError => {
        // this.progress.complete();
      });
  }
}
