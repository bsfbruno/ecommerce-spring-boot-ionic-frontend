import { ClienteService } from './../../services/domain/cliente.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      //instanciar o formGroup
      this.formGroup = this.formBuilder.group({
        nome: ['Joaquim' , [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com' , [Validators.required, Validators.email]],
        tipo: ['1' , [Validators.required]],
        cpfOuCnpj: ['06134596280' , [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123' , [Validators.required]],
        logradouro: ['Rua Via' , [Validators.required]],
        numero: ['25' , [Validators.required]],
        complemento: ['Apto' , []],
        bairro: ['Copacabana' , []],
        cep: ['10828333' , [Validators.required]],
        telefone1: ['111111111' , [Validators.required]],
        telefone2: ['' , []],
        telefone3: ['' , []],
        estadoId: ['null' , [Validators.required]],
        cidadeId: ['null' , [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(
      response => {
        this.estados = response;
        //pegar o primeiro elemento dessa lista e atribuir ele na lista do formulário
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {}
    );
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(
      response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {}
    );
  }

  signupUser(){
    this.clienteService.insert(this.formGroup.value).subscribe(
      response => {
        this.showInsertOk();
      },
      error => {}
    );
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso!',
      //só fecha a mensagem se o usuário clicar em OK
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          //executa uma ação quando o usuário clicar em OK
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
