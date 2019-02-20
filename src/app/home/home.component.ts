import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Menu: boolean;
  listadoPack;
  portada;
  fondo;
  fondoActivo;
  position: number;
  inicio;
  popup;
  email;
  contra;
  cliente;
  ok;
  busqueda;

  constructor(
    private dashboardService: UsuarioService
  ) {
    this.busqueda = "";
    this.ok = true;
    this.cliente = null;
    this.validarRegistro = false;
    this.email = "";
    this.contra = "";
    this.inicio = "0";
    this.portada = "";
    this.fondo = "";
    this.fondoActivo = "";
    this.popup = true;
    this.Menu = false;
    this.position = 0;
  }



  ngOnInit() {
    this.cliente = localStorage.getItem("cliente");
    if(this.cliente === null){
      this.ok = true;
    }else{
      this.ok = false;
    }
    if (localStorage.getItem("modal") === "true") {
      this.popup = false;
    }
    this.dashboardService.returnListPacks()
      .snapshotChanges()
      .subscribe(data => {
        this.listadoPack = [];
        data.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.listadoPack.push(x);
        });
        this.fondo = "url(" + this.listadoPack[0].portada + ")";
        this.fondoActivo = this.listadoPack[0].portada;
        this.inicio = "1";
        this.portada = this.listadoPack[0];
      });
    if (window.innerWidth > 769) {
      this.Menu = true;
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
  variables;
  Seleccionar(obj) {
    this.portada = obj;
    this.fondo = "url(" + this.portada.portada + ")";
    this.fondoActivo = this.portada.portada

    this.Animaciones()
  }

  Cerrar() {
    this.popup = false;
    localStorage.setItem("modal", "true")
    this.Animaciones();
  }

  Animaciones() {

    document.getElementById("titulo1").style.animation = 'none';
    document.getElementById("titulo1").offsetHeight; /* trigger reflow */
    document.getElementById("titulo1").style.animation = null;

    document.getElementById("subtitulo1").style.animation = 'none';
    document.getElementById("subtitulo1").offsetHeight; /* trigger reflow */
    document.getElementById("subtitulo1").style.animation = null;

    document.getElementById("album").style.animation = 'none';
    document.getElementById("album").offsetHeight; /* trigger reflow */
    document.getElementById("album").style.animation = null;


  }

  moverDerecha() {
    let position;
    let aux = 0;
    this.listadoPack.forEach(element => {
      if (element.portada === this.fondoActivo) {
        position = aux;
      } else {
        aux++;
      }
    });
    this.fondoActivo = this.listadoPack[position + 1].portada;
    this.fondo = "url(" + this.listadoPack[position + 1].portada + ")";
    this.portada = this.listadoPack[position + 1];
    this.Animaciones()

  }
  moverIzquierda() {
    let position;
    let aux = 0;
    this.listadoPack.forEach(element => {
      if (element.portada === this.fondoActivo) {
        position = aux;
      } else {
        aux++;
      }
    });
    if (position > 0) {

      this.fondo = "url(" + this.listadoPack[position - 1].portada + ")";
      this.fondoActivo = this.listadoPack[position - 1].portada;

      this.portada = this.listadoPack[position - 1];
      this.Animaciones()
    }

  }

  validarRegistro;
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
    console.log(this.email);
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
