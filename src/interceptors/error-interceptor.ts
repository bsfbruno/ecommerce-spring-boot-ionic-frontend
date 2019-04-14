import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {
            
            //intercepta apenas a lista de erros retornadas pelo Spring
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;                
            }
            //verifica se o objeto retornado é JSON, se não, a verificação converte o objeto para JSON
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }
            
            console.log(errorObj)
            
            switch(errorObj.status){
                case 401:
                this.handle401();
                break;

                case 403:
                this.handle403();
                break;

                default:
                this.handleDefaultError(errorObj);
            }

            return Observable.throw(errorObj);

        }) as any;
    }
    
    handle403() {
        this.storage.setLocalUser(null);
    }

    handle401() {
        let alert = this.alertCtrl.create({
            title:  'Erro 401',
            message: 'Email ou Senha incorretos',
            //obriga o usuário a clicar no botão de alerta para fechá-lo
            enableBackdropDismiss: false,
            buttons:[
                {text: 'OK'}
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title:  'Erro' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            //obriga o usuário a clicar no botão de alerta para fechá-lo
            enableBackdropDismiss: false,
            buttons:[
                {text: 'OK'}
            ]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};