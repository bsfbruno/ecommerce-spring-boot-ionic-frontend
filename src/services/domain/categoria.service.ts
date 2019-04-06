import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//corrigir importação para "rxjs/RX"
import { Observable } from "rxjs/RX";
import { CategoriaDTO } from "../../models/categoria.dto";

//anotação permite que o serviço seja injetada em outras classes
@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient){
    }

    findAll() : Observable<CategoriaDTO[]> {
        //a crase permite concatenar objetos sem precisar utilizar o +
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}