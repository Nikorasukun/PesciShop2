import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor() { }

  isLogged = signal<boolean>(false);
}
