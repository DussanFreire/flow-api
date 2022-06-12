export class QrGenerationDto {
    appUserId: string;
    currency:string;
    amount:number;
    gloss:string;
    serviceCode:string;
    businessCode:string;
    expiration:Date;
    collectors:{
        name:string;
        parameter:string;
        value:string;
    };
    publicToken:string;
}
