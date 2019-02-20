import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  listPacks;
  listAuxPacks;
  busqueda;
  resultSearch : any[];
  resultSearchTwo : any[]; 

  constructor(
    private dashboardService: UsuarioService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    const slug = this.ActivatedRoute.snapshot.paramMap.get("busqueda");
    console.log(slug);
    this.busqueda = slug.toUpperCase();
    this.dashboardService.returnListPacks()
      .snapshotChanges()
      .subscribe(data => {
        this.listPacks = [];
        this.resultSearch = [];
        data.forEach(element => {
          let bool = false;
          let x = element.payload.toJSON();
          Object.keys(x["tag"]).map(function (key) {
            console.log(x["tag"][key].toUpperCase());
            console.log(slug.toUpperCase());
            if (x["tag"][key].toUpperCase().match(slug.toUpperCase())) {
              bool = true;
            }
          });
          if(bool){
            this.resultSearch.push(x);
          }
        });

        this.dashboardService.returnListModelos()
          .snapshotChanges()
          .subscribe(data => {
            this.listAuxPacks = []
            this.resultSearchTwo = [];
              data.map(data => {
              let x = data.payload.toJSON()
              if (x["nombre"].toUpperCase().match(slug.toUpperCase())) {
                this.resultSearchTwo.push(x);
              }
            });
          });
      });
  }

}
