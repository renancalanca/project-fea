import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx'
import { ActionSheetController, Platform } from '@ionic/angular';
import * as Tesseract from 'tesseract.js'
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';

@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.page.html',
  styleUrls: ['./etiqueta.page.scss'],
})
export class EtiquetaPage implements OnInit {

  @Output() imagePick = new EventEmitter<string>();

  selectedImage: string;
  imageText: string;
  usePicker = false;

  constructor(private camera: Camera, private actionSheetCtrl: ActionSheetController, private platform: Platform) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
    }
  }

  ionViewDidEnter() {

  }

  ionViewWillEnter() {

  }

  ionViewWillLeave() {

  }

  ionViewDidlLeave() {

  }

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

  pickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }

    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    }).then(image => {
      this.selectedImage = image.base64String;
      this.imagePick.emit(image.base64String);
    }).catch(error => {
      console.log(error);
    });

  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
    };
    fr.readAsDataURL(pickedFile);

  }

  recognizeImage() {
    // Tesseract.recognize(this.selectedImage)
    //https://soudealgodao.com.br/new-site/wp-content/uploads/2017/01/Etiqueta-1.jpg
    //https://tesseract.projectnaptha.com/img/eng_bw.png
    Tesseract.recognize(this.selectedImage)
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
