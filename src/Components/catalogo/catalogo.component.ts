import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-catalogo',
  imports: [HttpClientModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent implements OnInit{
  http = inject(HttpClient);
  pesci:any;

  ngOnInit(): void {
    this.fetchPesci();
  }

  fetchPesci(){
    this.http.get("http://localhost:8089/api/pesci").subscribe(
      {
        next: pesci => {
          this.pesci = pesci; //do il risultato giusto
          console.log(pesci)
        },
        error: error => {
          console.error("error fetching data ", error)
        }
      }
    )
  }
}
