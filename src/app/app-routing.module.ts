import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './pages/people/people.component';
import { PersonComponent } from './pages/person/person.component';


const routes: Routes = [
  { path:'people', component:PeopleComponent },  
  { path:'person/:id', component:PersonComponent },
  { path:'**', pathMatch:'full', redirectTo: 'people'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
