// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseApiKey : 'AIzaSyBp9W1ZANZ9xaToqviK1QdKkIx4_nupfSM'

};

export const firebaseConfig = {
  fire: {
    apiKey: "AIzaSyBp9W1ZANZ9xaToqviK1QdKkIx4_nupfSM",
    authDomain: "project-fea.firebaseapp.com",
    databaseURL: "https://project-fea.firebaseio.com",
    projectId: "project-fea",
    storageBucket: "",
    messagingSenderId: "1095699806529",
    appId: "1:1095699806529:web:983e86b5dae4025a"
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
