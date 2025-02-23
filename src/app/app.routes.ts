import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { CatalogoComponent } from '../Components/catalogo/catalogo.component';
import { ChiSiamoComponent } from '../Components/chi-siamo/chi-siamo.component';
import { LoginComponent } from '../Components/login/login.component';

export const routes: Routes = [
    { path:'', component: HomeComponent },
    { path:'catalogo', component: CatalogoComponent },
    { path:'chisiamo', component: ChiSiamoComponent },
    { path:'login', component: LoginComponent },
];
