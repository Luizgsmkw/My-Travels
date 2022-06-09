import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  classesColor: string = "navBar-color";
  ativo: boolean = true;

  constructor(
    private authService: AuthService,
    private toast: HotToastService

  ) { }

  logged$?: Observable<any>;
  log: any;

  logout() {
    this.authService.logout('/login')
      .pipe(
        this.toast.observe({
          success: 'Volte logo!',
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
    this.authService.logged.subscribe
      (valor => {this.log = valor;})
  }

  onToggle() {
    this.ativo = !this.ativo;

    if (this.ativo) {
      this.classesColor = "navBar-color";
    } else {
      this.classesColor = "navBar-color2";
    }
  }
}
