import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-mistrabajos',
  templateUrl: './mistrabajos.component.html',
  styleUrls: ['./mistrabajos.component.css']
})
export class MistrabajosComponent implements OnInit {

  /* Variables */

  urlToOpen;
  lightBox;
  portada;
  listTrabajos: any[];
  cantidad;

  /* Services */
  constructor(
    private dashboardService: UsuarioService
  ) {
    this.listTrabajos = [];
    this.urlToOpen = "";
    this.lightBox = false;
  }


  ngOnInit() {
    /* Search some portada */
    this.dashboardService.returnListPacks()
      .snapshotChanges()
      .subscribe(data => {
        let portadas = []
        portadas = data.map(info => {
          let x = info.payload.toJSON();
          return x["portada"];
        });
        let numberAux;
        numberAux = Math.round(Math.random() * (portadas.length - 1));
        this.portada = portadas[numberAux];
      });

    /* List of works */
    this.dashboardService.returnListTrabajos()
      .snapshotChanges()
      .subscribe(data => {
        this.cantidad = 0;
        this.listTrabajos = [];
        this.listTrabajos = data.map(data => data.payload.toJSON());
        this.cantidad = this.listTrabajos.length;
      });
  }

  /* Opem lightBox and photo viewer */
  valorUrl(value) {
    this.urlToOpen = value;
    this.lightBox = true;
  }
}
