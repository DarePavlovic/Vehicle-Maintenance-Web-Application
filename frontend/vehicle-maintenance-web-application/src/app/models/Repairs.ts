export class Repairs{
    _id:string='';
    idUser:string='';
    idVehicle:string='';
    idDefect:Array<string>=[];
    date: Date = new Date();
    price:number=0;
    description:string='';
}