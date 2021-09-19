import { environment } from './../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})

export class ConnectionService implements HttpInterceptor {

    // RUTAS DE LA API
    public static LEAGUES: string = 'leagues/';
    public static TEAMS: string = 'teams/';
    public static PLAYERS: string = 'players/';

    constructor(
        private http: HttpClient,
        private spinner: NgxSpinnerService,
        private router: Router,
        private _location: Location
    ) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
            }
        });
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {

                if (event instanceof HttpResponse) {
                    this.spinner.hide();
                }

            }),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                this.spinner.hide();
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                // this.handleError(error);
                return throwError(errorMessage);
            })
        );
    }

    public get(url: string): Observable<any> {
        // this.spinner.show();
        let urlAux: string = environment.apiServer + url;
        return this.http.get(urlAux, { observe: 'response' });
    }

    public post(url: string, data: any): Observable<any> {
        // this.spinner.show();
        let urlAux: string = environment.apiServer + url;
        return this.http.post(urlAux, data);
    }

    public put(url: string, data: any): Observable<any> {
        // this.spinner.show();
        let urlAux: string = environment.apiServer + url;
        return this.http.put(urlAux, data);
    }

    public delete(url: string): Observable<any> {
        // this.spinner.show();
        let urlAux: string = environment.apiServer + url;
        return this.http.delete(urlAux);
    }

    public back(): void {
        this._location.back();
    }
}
