import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import {HomeComponent } from './home/home.component';
import { EditComponent } from './home/edit/edit.component';
const routes: Routes = [
 
  {path: '', redirectTo: 'home/prospects', pathMatch: 'full'}, 
  {path: 'home/prospects' , component : HomeComponent},
  {path: 'home/prospects/edit', component : EditComponent},
  {path: 'about' ,component : AboutComponent}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
