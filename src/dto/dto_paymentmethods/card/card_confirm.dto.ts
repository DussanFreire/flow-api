export class CardConfirmDto {
    appUserId: string;
    publicToken: string;
    date: Date;
    hour: string;
    otp: number;
    correlationId: string;
    authorizationNumber: number;
}