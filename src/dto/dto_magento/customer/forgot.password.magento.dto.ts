import { IsNotEmpty } from "class-validator";

export class ForgotPassword{    
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    template: string;
}