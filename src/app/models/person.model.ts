export class PersonModel{
    id: string;
    name:string;
    location:string;
    developer: boolean;

    constructor(){
        this.developer = true;
    }
}