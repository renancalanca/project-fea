import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
 
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

  checkSimilarity(){

  }

}