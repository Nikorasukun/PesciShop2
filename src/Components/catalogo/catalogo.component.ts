import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MainServiceService } from '../../Services/MainService/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  imports: [HttpClientModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent implements OnInit{
  constructor(private router:Router) {}

  http = inject(HttpClient);
  pesci:any;

  servizio = inject(MainServiceService)

  ngOnInit(): void {
    this.fetchPesci();
  }

  fetchPesci(){
    this.http.get("http://localhost:8089/api/pesci").subscribe(
      {
        next: pesci => {
          this.pesci = pesci;
        },
        error: error => {
          console.error("error fetching data ", error)
        }
      }
    )
  }

  addToCart() {
    if(!this.servizio.isLogged()){
      alert('You first need to login!')
      this.router.navigate(['/login'])
    }
  }
}
