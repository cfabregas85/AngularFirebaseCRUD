import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PersonModel } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import Swal from "sweetalert2";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person = new PersonModel();   

  constructor(private personServices:PersonService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const ID = this.route.snapshot.paramMap.get('id');

    if (ID != 'new') {
      this.personServices.GetPerson(ID).
      subscribe( (resp: PersonModel)=> {
         this.person = resp;
         this.person.id = ID;
      });
    }
  }

  Save(form: NgForm){

      if (form.invalid) {
        return;      
      }  

      let request : Observable<any>;     

      Swal.fire({
        title: 'Wait',
        text:'Saving..', 
        type:'info',
        allowOutsideClick:false               
      });

      Swal.showLoading();
      
      //Create/Update 
      if (this.person.id) {
        request = this.personServices.UpdatePerson(this.person);               
      } else {
        request = this.personServices.CreatePerson(this.person);
      }
       
      request.subscribe(resp=>{
        Swal.fire({
          title: this.person.name,
          text:'Success', 
          type:'success'               
        });    
      });        
  }
}
