import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { PlataformasComponent } from '../frontend/plataformas/plataformas.component';
import { NewPlataformaComponent } from '../frontend/new-plataforma/new-plataforma.component';
import { BackendStandardComponent } from '../backend/backend-standard/backend-standard.component';
import { ValidateComponent } from '../frontend/validate/validate.component';
import { LoginComponent } from '../backend/login/login.component';
import { SidenavComponent } from '../backend/sidenav/sidenav.component';
import { InicioComponent } from '../backend/inicio/inicio.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { NotificacionesComponent } from '../backend/notificaciones/notificaciones.component';
import { VentasComponent } from '../backend/ventas/ventas.component';
import { SoporteComponent } from '../backend/soporte/soporte.component';
import { MensajesComponent } from '../backend/soporte/mensajes/mensajes.component';
import { UsuarioOnlineComponent } from '../frontend/usuario-online/usuario-online.component';
import { TerminosComponent } from '../terminos/terminos.component';
import { PruebaComponent } from '../prueba/prueba.component';
import { BlogComponent } from '../blog/blog.component';
import { EntradasComponent } from '../entradas/entradas.component';
import { ListadoEntradaComponent } from '../backend/listado-entrada/listado-entrada.component';
import { EmprendedoresComponent } from '../emprendedores/emprendedores.component';
import { EntradaItemComponent } from '../entrada-item/entrada-item.component';
import { StoreEntradaComponent } from '../backend/store-entrada/store-entrada.component';
import { ListadoComponent } from '../emprendedores/listado/listado.component';
import { ItemlistadoComponent } from '../emprendedores/listado/itemlistado/itemlistado.component';
import { LoginempComponent } from '../backendemp/loginemp/loginemp.component';
import { NewitemComponent } from '../backendemp/newitem/newitem.component';
import { ListadoitembComponent } from '../backendemp/listadoitemb/listadoitemb.component';
import { EdititemComponent } from '../backendemp/edititem/edititem.component';
import { ComoHacerTiendaOnlineComponent } from '../post/como-hacer-tienda-online/como-hacer-tienda-online.component';
import { HomeComponent } from '../home/home.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { ItemalbumComponent } from '../itemalbum/itemalbum.component';
import { CategoriasComponent } from '../categorias/categorias.component';
import { ModelosComponent } from '../modelos/modelos.component';
import { ContactoComponent } from '../contacto/contacto.component';
import { MistrabajosComponent } from '../mistrabajos/mistrabajos.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent  },
  { path: 'trabajos', component: MistrabajosComponent },  
  { path: 'categorias', component: CategoriasComponent },
  { path: 'modelos', component: ModelosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'busqueda/:busqueda', component: BusquedaComponent},  
  { path: ':nombredemodelo/:nombrealbum', component: ItemalbumComponent},  
  { path: ':nombredemodelo', component: PerfilComponent},
  { path: 'cliente-backend',component: BackendStandardComponent},
  { path: 'login', component: ValidateComponent},
  { path: 'backend/login', component: LoginComponent},
  { path: 'terminos', component: TerminosComponent},
  { path: 'blog', component: BlogComponent},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
],
  declarations: []
})

export class AppRoutingModule {}