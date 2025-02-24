import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MainServiceService } from '../../Services/MainService/main-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    HttpClientModule,
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  http = inject(HttpClient);
  clienti: any;

  ngOnInit(): void {
    this.fetchUtenti();
  }

  fetchUtenti() {
    this.http.get('http://localhost:8089/api/clienti').subscribe({
      next: (clienti) => {
        this.clienti = clienti; //do il risultato giusto
        console.log('clienti');
        console.log(clienti);
      },
      error: (error) => {
        console.error('error fetching data ', error);
      },
    });
  }

  readonly email = new FormControl('', [Validators.required, Validators.email]);

  servizioPrincipale = inject(MainServiceService);

  errorMessage = signal('');

  constructor(private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  tryToLog(user: string, psw: string) {
    for (let i = 0; i < this.clienti.length; i++) {
      if (this.clienti[i].Email == user && this.clienti[i].Password == psw) {
        this.servizioPrincipale.isLogged.set(true);
        this.router.navigate(['/']);
        return;
      }
    }
    alert(`Incorrect Email or Password`)
  }
}
