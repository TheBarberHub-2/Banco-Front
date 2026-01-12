import { Component } from '@angular/core';
import { CPanel } from '../../ui/c-panel/c-panel';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CPanel],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  peluqueriasCount: number = 0;
  categoriasCount: number = 0;
  usuariosCount: number = 0;
  productosCount: number = 0;

  // constructor(
  //   private peluqueriasService: PeluqueriasService,
  //   private categoriasService: CategoriasService,
  //   private usuariosService: UsuariosService,
  //   private productosService: ProductosService
  // ) {}

  // ngOnInit() {
  //   this.peluqueriasService.getPeluquerias().subscribe((data) => {
  //     this.peluqueriasCount = data.totalElements;
  //   });

  //   this.categoriasService.getCategorias().subscribe((data) => {
  //     this.categoriasCount = data.totalElements;
  //   });

  //   this.usuariosService.getUsuarios().subscribe((data) => {
  //     this.usuariosCount = data.totalElements;
  //   });
  //   this.productosService.getProductos().subscribe((data) => {
  //     this.productosCount = data.taotalElements;
  //   });
  // }
}
