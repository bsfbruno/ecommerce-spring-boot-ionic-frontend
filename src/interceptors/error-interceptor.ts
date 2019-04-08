import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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
            console.log("Erro detectado pelo interceptor");
            console.log(errorObj)
            return Observable.throw(errorObj);

        }) as any;
    }
}



export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};