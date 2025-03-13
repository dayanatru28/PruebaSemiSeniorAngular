import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const routes: Routes = [

    //Detallan las rutas que debe tomar el proyecto
    { path: '**', redirectTo: 'admin' } ,
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    { path: 'admin', component: AdminComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
