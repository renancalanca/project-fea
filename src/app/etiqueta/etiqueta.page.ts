import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx'
import { ActionSheetController, Platform } from '@ionic/angular';
import * as Tesseract from 'tesseract.js'
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { EtiquetaService } from './etiqueta.service';
import { Etiqueta } from '../shared/model/etiqueta';
import { Classificacao } from '../shared/model/classificacao';

@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.page.html',
  styleUrls: ['./etiqueta.page.scss'],
})
export class EtiquetaPage implements OnInit {

  etiqueta: Etiqueta;
  classificacao: Array<Classificacao> = [];
  selectedImage: string;
  imageText: string;
  
  usePicker = false;
//  stringSimilarity = require('string-similarity');

  constructor(private camera: Camera, private actionSheetCtrl: ActionSheetController, private platform: Platform, private etiquetaService : EtiquetaService) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
    }

    this.etiquetaService.getAll()
    .subscribe((data: Array<Classificacao>) => {
      this.classificacao = data;
      //console.log(this.classificacao);
    });
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

  compareText(){
    this.etiquetaService.checkSimilarity(this.classificacao, this.imageText);
    
  }

}
