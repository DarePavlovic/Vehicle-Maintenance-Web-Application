import { OID } from "./Oid";
export class User{
    // _id: Array<OID> = [];
    _id: string='';
    firstname: string = '';
    lastname: string = '';
    username: string = '';
    password: string = '';
    email: string = '';
    phone: string = '';
    address: string = '';
    picture: string = '';
    type: string = '';
    coefficient: number = 1;
    salary: number = 0;
    // licensePlate: string = '';
    idVehicle: string = '';
}