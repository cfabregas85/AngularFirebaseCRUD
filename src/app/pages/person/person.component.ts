import { Component, OnInit } from '@angular/core';
import { PersonModel } from '../../models/person.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person = new PersonModel();   

  constructor() { }

  ngOnInit() {
  }

  Save(form: NgForm){

    if (form.invalid) {
       return;      
    }
    
    console.log(form);
    console.log(this.person);

  }

}
