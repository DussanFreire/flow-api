export class CardReturnDto {
    appUserId: string;
    currency: string;
    amount: number;
    publicToken: string;
    date: Date;
    hour: string;
    correlationId: string;
    serviceCode: string;
    businessCode: string;
}