import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {


  email;
  contra;
  cliente;
  variables;
  validarRegistro;
  ok;
  busqueda;
  
  constructor(
    private dashboardService : UsuarioService
  ) 
  {
    this.validarRegistro = false;
    this.email = "";
    this.contra = "";
    this.ok = false;
    this.cliente = null;
  }

  ngOnInit() {
    this.cliente = localStorage.getItem("cliente");
    if(this.cliente === null){
      this.ok = true;
    }else{
      this.ok = false;
    }
    this.dashboardService.returnListClient()
    .snapshotChanges()
    .subscribe(data => {
      let x = true;
      this.variables = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        this.variables.push(x);
      });
    });
  }
  iniciarSesion(){
    let x = false;
    this.variables.forEach(element => {
      if(element.email === this.email && element.contra === this.contra){
        this.validarRegistro = false;
        x = true;
      } 
    });
    if(x){
      localStorage.setItem("cliente", this.email);
      location.reload();
    }else{
      this.validarRegistro = true;
    }
  }
  registro() {
    let obj = {
      email: "",
      contra: ""
    };
    let x = true;
      this.variables.forEach(element => {
        if(element.email === this.email){
          this.validarRegistro = true;
          x = false;
        } 
      });
      if(x){
        if(this.email !== "" && this.contra !== ""){
          x = true;
          console.log(this.email)
          obj.email = this.email;
          obj.contra = this.contra;
          this.dashboardService.nuevoCliente(obj);
          localStorage.setItem("cliente",this.email);
          location.reload();
        }else{
          this.validarRegistro = true;
        }
      }
      

    
  }
  cerrar(){
    localStorage.clear();
    location.reload();

  }
}
