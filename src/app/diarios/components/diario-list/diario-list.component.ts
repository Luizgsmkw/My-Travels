import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Diario } from 'src/app/core/models/diario';
import { DiariosService } from 'src/app/core/services/diarios/diarios.service';
import { DiarioAddComponent } from '../diario-add/diario-add.component';
import { DiarioEditComponent } from '../diario-edit/diario-edit.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-diario-list',
  templateUrl: './diario-list.component.html',
  styleUrls: ['./diario-list.component.scss'],
  
})
export class DiarioListComponent implements OnInit {
  allDiarios$?: Observable<Diario[]>;
  meusDiarios$?: Observable<Diario[]>;
  numeroDeColunas: number = 2;

  constructor(
    private dialog: MatDialog,
    private diariosService: DiariosService,
    private toast: HotToastService
  ) { }

  onClickAdd() {

    const ref = this.dialog.open(DiarioAddComponent, { maxWidth: '512px' });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.diariosService
            .addDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Adicionando...',
                error: 'Ocorreu um erro',
                success: 'Diário adicionado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onClickEdit(diario: Diario) {

    const ref = this.dialog.open(DiarioEditComponent, {
      maxWidth: '512px',
      data: { ...diario },
    });
    ref.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.diariosService
            .editDiario(result.diario, result.imagem)
            .pipe(
              this.toast.observe({
                loading: 'Atualizando...',
                error: 'Ocorreu um erro',
                success: 'Diário atualizado',
              })
            )
            .subscribe();
        }
      },
    });
  }

  onClickDelete(diario: Diario) {

    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter a exclusão!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#01A4B5',
      cancelButtonColor: '#F27C38',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.diariosService
          .deleteDiario(diario)
          .pipe(this.toast.observe({ success: 'Diário apagado!' }))
          .subscribe();
      }
    })

  }
  ngOnInit(): void {
    this.allDiarios$ = this.diariosService.getTodosDiarios();
    this.meusDiarios$ = this.diariosService.getDiariosUsuario();
  }

  onCols(event: any) {
 this.numeroDeColunas = (event.target.innerWidth >= 890) ? 2 : 1;
    }


    
  

    // onCols1(event: any) {
    //   this.numeroDeColunas = (event.target.innerWidth >= 930) ? 2 : 1;
    //   }

}