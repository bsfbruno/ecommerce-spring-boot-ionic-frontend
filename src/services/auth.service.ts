import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from "@angular/core";
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage: StorageService) {        
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
            {
                //retornar o header da resposta
                observe: 'response',
                responseType: 'text'
            });
    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                //retornar o header da resposta
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authrizationValue: string){
        let tok = authrizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub//extrai email do token
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}