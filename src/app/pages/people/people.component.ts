import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonModel } from '../../models/person.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  People : PersonModel[]=[];
  varLoading = false;
  
  
  constructor( private personService: PersonService) { }

  ngOnInit() {
    this.varLoading = true;
    this.personService.GetPeople()
        .subscribe(resp=> {
          this.People = resp;
          this.varLoading = false  
        });
  }

  Delete(person:PersonModel, i : number){

   Swal.fire({
     title:'Hello',
     text:`Are you sure you want to delete ${person.name} ?`,
     type:'question',
     showConfirmButton: true,
     showCancelButton:true
   }).then(resp=>{
       if (resp.value) {
        this.personService.DeletePerson(person.id).subscribe();
        this.People.splice(i,1);
       }
   });
   
  }

}
