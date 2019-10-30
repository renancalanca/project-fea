import { Component, OnInit } from '@angular/core';
import { Camera, PictureSourceType } from '@ionic-native/camera/ngx'
import { ActionSheetController, Platform } from '@ionic/angular';
import Tesseract from 'tesseract.js';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { EtiquetaService } from './etiqueta.service';
import { Etiqueta } from '../shared/model/etiqueta';
import { Classificacao } from '../shared/model/classificacao';
const { TesseractWorker } = Tesseract;
const worker = new TesseractWorker();

@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.page.html',
  styleUrls: ['./etiqueta.page.scss'],
})

export class EtiquetaPage implements OnInit {

  etiqueta: Etiqueta;
  classificacoes: Array<Classificacao> = [];
  selectedImage: string;
  imageText: string;
  classificacao: string;
  tecido: string;
  loadProgress: number = 0;
  motivo: string;

  usePicker = false;

  constructor(private camera: Camera, private actionSheetCtrl: ActionSheetController, private platform: Platform, private etiquetaService: EtiquetaService) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.usePicker = true;
    }

    this.etiquetaService.getAll()
      .subscribe((data: Array<Classificacao>) => {
        this.classificacoes = data;
      });
  }

  async selectSource() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Biblioetca',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Camera',
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

  onFileChosen(event: Event) {
    this.cleanVariables();
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
    worker
      .recognize(
        this.selectedImage, 'eng'
      )
      .progress(
        message => {
          if (message.status === 'recognizing text') {
            this.loadProgress += (message.progress);
            console.log('progress', message.progress);
          }
        })
      .catch(err => console.error(err))
      .then(result => {
        this.imageText = result.text;
        this.compareText();
      })
      .finally(resultOrError => {
        this.loadProgress = 0;
      });;
  }

  compareText() {
    let result = this.etiquetaService.checkSimilarity(this.classificacoes, this.imageText);

    if (result == null) {
      this.classificacao = "Tecido não encontrado na base de dados";
    } else {
      this.classificacao = result.classificacao;
      this.motivo = result.motivo;
      this.tecido = result.tecido;
    }
  }

  private cleanVariables() {
    this.imageText = "";
    this.classificacao = "";
    this.tecido = "";
    this.loadProgress = 0;
  }
}
