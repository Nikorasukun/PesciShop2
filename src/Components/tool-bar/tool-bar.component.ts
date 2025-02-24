import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainServiceService } from '../../Services/MainService/main-service.service';

@Component({
  selector: 'tool-bar',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, RouterLink, RouterOutlet],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
  servizio = inject(MainServiceService);

  servizioPrincipale = inject(MainServiceService)

  logout() {
    this.servizioPrincipale.isLogged.set(false);
  }
}
