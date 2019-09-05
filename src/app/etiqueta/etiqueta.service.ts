import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Classificacao } from '../shared/model/classificacao';
import * as stringSimilarity from 'string-similarity';
import { Etiqueta } from '../shared/model/etiqueta';

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('classificacao')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  checkSimilarity(classificao: Array<Classificacao>, imageText: string) {

    //imageText = ", 7 x cm , 7 , _‘ 7.CNPJ: 85,462,513/0001-77 : INDUSTRIA BRASILEIRA ; A z, 100%ALGUDA0 : 4 nga33 ~";
    //imageText = "MARLUTEX CNPJ: 14.663.602/0001-96 \9! X E 8 18 Invasmuawwn 100%POLIESTER BEBE!";

    //Necessário adicionar string tudo na mesma linha
    imageText = imageText.replace(/\n/ig, " ");

    //Na string adiciona espaço antes e depois do porcentagem.
    var rg = new RegExp("\\" + "%", "g");
    imageText = imageText.replace(rg, " " + "%" + " ");

    //Separa a string em um array de palavras
    let words = imageText.split(" ");
    console.log("Palavras: ");
    console.log(words);

    let tecidos = [];

    //Verifica onde existe porcentagem e caso exista cria um objeto contendo a porcentagem e o nome do tecido (Antes e depois do simbolo %)
    for (let i = 0; i < words.length; i++) {
      if (words[i].includes("%")) {
        console.log("Matching Words: ");
        // console.log(words[i - 1]);
        // console.log(words[i + 1]);

        let palavraAnterior;
        let palavraPosterior;

        //Caso seja vazia ou um espaço a palavra do indice anterior ele utiliza a anterior da anterior
        if (!words[i - 1].replace(/\s/g, '').length) {
          palavraAnterior = words[i - 2];
          console.log("palavra vazia");
        } else {
          palavraAnterior = words[i - 1];
        }

        //Caso seja vazia ou um espaço a palavra do indice posterior ele utiliza a posterior da posterior
        if (!words[i + 1].replace(/\s/g, '').length) {
          palavraPosterior = words[i + 2];
          console.log("palavra vazia");
        } else {
          palavraPosterior = words[i + 1];
        }

        console.log("Anterior " + palavraAnterior);
        console.log("Posterior " + palavraPosterior);

        //Cria a etiqueta a adiciona na lista
        let etiqueta = new Etiqueta(palavraAnterior, palavraPosterior, "");
        tecidos.push(etiqueta);
      }
    }

    let result;
    let maiorPorcentagem = 0;

    //console.log("Tecido lenght " + tecidos.length);

    for (let i = 0; i < tecidos.length; i++) {

      //Verifica qual tecido tem maior porcentagem. O que tiver será utilizado para a comparação de strings do banco.
      if (maiorPorcentagem < tecidos[i].porcentagem) {
        maiorPorcentagem = tecidos[i].porcentagem
        //console.log(maiorPorcentagem);

        //Pega o nome do tecido e compara com os tecidos do banco, retornando o que tem maior similaridade
        result = stringSimilarity.findBestMatch(tecidos[i].tecido.toLowerCase(), this.getAllNomeClassificao(classificao));
      }
    }

    console.log("Best Match");
    console.log(result);
    console.log(result.bestMatch.target);
    console.log(result.bestMatch.rating);

    let etiquetaRetorno = new Etiqueta(
      result.bestMatch.rating,
      result.bestMatch.target.toUpperCase(),
      this.getClassificaoTecido(classificao, result.bestMatch.target.toLowerCase())
    )

    if (etiquetaRetorno.porcentagem >= "0.5") {
      console.log("Retornando");
 
      //Somente retorna o best match se tiver mais que 0.5 de rating
      return etiquetaRetorno;
    }

    return null;
  }

  private getAllNomeClassificao(classificao: Array<Classificacao>) {
    let array = [];
    for (let i = 0; i < classificao.length; i++) {
      array.push(classificao[i].nome);
    }
    return array;
  }

  private getClassificaoTecido(classificao: Array<Classificacao>, nomeTecido) {
    for (let i = 0; i < classificao.length; i++) {
      if (classificao[i].nome == nomeTecido) {
        return classificao[i].nota;
      }
    }
    return "Não foi possível localizar tecido na base de dados";
  }

}