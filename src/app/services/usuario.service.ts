import { Injectable } from '@angular/core';
// FireBase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private fireBase: AngularFireDatabase) { }

  listPacks: AngularFireList<any>;
  listModelos: AngularFireList<any>;
  listClients: AngularFireList<any>;
  listTrabajo: AngularFireList<any>;

  returnListClient(){
    return this.listClients = this.fireBase.list("clientes");
  }
  returnListTrabajos(){
    return this.listTrabajo = this.fireBase.list("trabajos");
  }
  returnListPacks() {
    return this.listPacks = this.fireBase.list("packs");
  }

  returnListModelos() {
    return this.listModelos = this.fireBase.list("modelos");
  }


  nuevoCliente(obj){
    this.listClients.push({
      email:obj.email,
      contra:obj.contra,
      packs:"",
      likes:["0"],
      comentario:["0"]
    });
  }

  modificarCliente(cliente){
    this.listClients.update(cliente.$key,{
      email:cliente.email,
      contra:cliente.contra,
      packs:"",
      likes:cliente.likes,
      comentario:cliente.comentario
    });
  }
  modificarModelo(modelo){
    console.log(modelo);
    this.listModelos.update(modelo.$key,{
      email:modelo.email,
      fecha:modelo.fecha,
      foto:modelo.foto,
      fotografo:modelo.fotografo,
      likes:modelo.likes,
      nombre:modelo.nombre,
      packs:modelo.packs,
      sexo:modelo.sexo
    })

  }

  modificarPack(pack){
    console.log(pack);
    this.listPacks.update(pack.$key,{
      nombrePack:pack.nombrePack,
      cantidadFotos:pack.cantidadFotos,
      descripcion:pack.descripcion,
      fecha:pack.fecha,
      fotografo:pack.fotografo,
      fotos:pack.fotos,
      likes:pack.likes,
      modelo:pack.modelo,
      comentarios:pack.comentarios,
      portada:pack.portada,
      tag:pack.tag
    })
  }
}
