import { OID } from "./Oid";
export class User{
    firstname: string = '';
    lastname: string = '';
    username: string = '';
    password: string = '';
    email: string = '';
    picture: string = '';
    type: string = '';
    coefficient: number = 1;
    salary: number = 0;
    idVehicle: Array<OID>  = [];
}