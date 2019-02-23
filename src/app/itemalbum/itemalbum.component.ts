import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';


declare var js: { activatePaypal: Function, mostrarTexto: Function };
@Component({
  selector: 'app-itemalbum',
  templateUrl: './itemalbum.component.html',
  styleUrls: ['./itemalbum.component.css']
})
export class ItemalbumComponent implements OnInit {

  modelo;
  pack;
  cliente;
  comentario;
  listComentarios;
  lightBox;
  urlSeleccion;

  clientIsInPack : boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private DashboardService: UsuarioService
  ) {
    this.clientIsInPack = false;
    this.urlSeleccion = "";
    this.lightBox = false;
    this.listComentarios = [];
    this.comentario = "";
    this.isLike = false;
  }
  fotos: string[];
  url;
  tags;

  isLike;


  abrirFoto(url) {
    this.urlSeleccion = url;
    this.lightBox = true;
  }

  ngOnInit() {
    const usuario = localStorage.getItem("cliente");
    console.log();
    const modelo = this.activatedRoute.snapshot.paramMap.get("nombredemodelo")
    this.DashboardService.returnListModelos()
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(element => {
          let x = element.payload.toJSON();
          if (x["nombre"] === modelo) {
            x["$key"] = element.key;
            this.modelo = x;
          }
        });
        console.log(document.getElementsByClassName("paypal-button-text"));
      });
      var auxX = true;
     this.DashboardService.returnListPacks()
      .snapshotChanges()
      .subscribe(Data => {
        Data.forEach(element => {
          let x = element.payload.toJSON();
          if (x["modelo"] === modelo && this.activatedRoute.snapshot.paramMap.get("nombrealbum") === x["nombrePack"]) {
            x["$key"] = element.key;
            this.pack = x;
            if (this.pack.comentarios !== undefined) {
              this.listComentarios = Object.values(this.pack.comentarios);
            }
            this.fotos = this.pack.fotos;
            this.fotos = Object.values(this.fotos);
            this.tags = Object.values(this.pack.tag);
            /*** ACORDATE QUE FALTA ESTO */
            if (this.pack.usuario !== undefined) {
              let aux = Object.values(this.pack.usuario);
              aux.map(data => {
                if(data === usuario){
                  this.clientIsInPack = true;
                }
              });
              
              this.pack.usuario = Object.values(this.pack.usuario);
              this.pack.usuario.push(usuario);
            } else {
              this.pack.usuario = [];
              this.pack.usuario.push(usuario)
            }

            this.url = "url(" + this.pack.portada + ")";
            if(!this.clientIsInPack && auxX === true){
              js.activatePaypal(this.pack);
              x = false;
            }
          }
        });
        this.DashboardService.returnListClient()
          .snapshotChanges()
          .subscribe(data => {
            let obj;
            data.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              if (x["email"] === localStorage.getItem("cliente")) {
                this.cliente = x;
                if (Object.values(this.cliente.likes).indexOf(this.pack.nombrePack) === -1) {
                  this.isLike = false;
                } else {
                  this.isLike = true;
                }
              }
            });
          });
      })
  }

  like(pack) {
    console.log(this.cliente);
    console.log(this.cliente.likes);
    let aux = Object.values(this.cliente.likes);
    let x = true;

    var index = aux.indexOf(pack.nombrePack);

    console.log(index);

    if (index !== -1) {
      aux.splice(index, 1);
      pack.likes--;
      this.modelo.likes--;
    } else {
      pack.likes++;
      this.modelo.likes++;
      aux.push(pack.nombrePack);
    }

    this.cliente.likes = aux;
    console.log(this.modelo);
    this.DashboardService.modificarModelo(this.modelo);
    this.DashboardService.modificarCliente(this.cliente);
    console.log(pack);
    this.DashboardService.modificarPack(pack);
  }
  enviarComentario() {
    if (localStorage.getItem("cliente") !== null) {
      this.listComentarios.push(this.comentario);
      this.comentario = "";
      this.pack.comentarios = this.listComentarios;
      console.log(this.pack);
      this.DashboardService.modificarPack(this.pack);
    }
  }
}
