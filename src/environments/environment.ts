// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiServer: 'https://footbal-api.herokuapp.com/'
    // apiServer: ' http://localhost:3000/'
};

/*
 * For easiebugging in development mode, you can import the following file
 * to ignoree related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This rt should be commented out in production mode because it will have a negative impact
 * on perfore if an error is thrown.
 */
// import 'zjs/plugins/zone-error';  // Included with Angular CLI.
