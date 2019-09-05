import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonModel } from '../models/person.model';
import { map , delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

   //FireBase API-URL
   private url = 'https://crudfirebase-64d4f.firebaseio.com';
  constructor( private http:HttpClient) { }

  //CRUD Functions

  //Create

  CreatePerson(person:PersonModel){

    return this.http.post(`${this.url}/person.json`, person)
    .pipe(
      map((resp:any)=>{
        person.id = resp.name;
        return person;
      })
    );
  }

  // Update
  UpdatePerson(person:PersonModel){

    //Remove id from Person
       const personTemp={
         ...person
       };
       delete personTemp.id;
       //Update Person
    return this.http.put(`${this.url}/person/${person.id}.json`, personTemp);    
  }

  //Get Person by Id
  GetPerson(id : string){
    return this.http.get(`${this.url}/person/${id}.json`);
  }

  //Get all
  GetPeople(){
    return this.http.get(`${this.url}/person.json`)
    .pipe(
      map(this.MapPerson),delay(1500)
    );    
  }

  //Delete Person
  DeletePerson(id : string){
    return this.http.delete(`${this.url}/person/${id}.json`);
  }


  //Map Person
  private MapPerson(peopleObj:object){

    if (peopleObj === null){ return []; }

     const people : PersonModel[] =[];

     Object.keys(peopleObj).forEach(key=>{
       const person : PersonModel = peopleObj[key];
       person.id = key;
       people.push(person);
     });
     return people;
  }

}
