import { OID } from "./Oid";
export class Payment{
    _id: string='';
    idUser: string = '';
    idVehicle: string = '';
    date: Date = new Date();
    price: number = 0;
    description:string='';
    type:string='';
}