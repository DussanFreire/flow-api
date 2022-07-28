import { IsNotEmpty } from "class-validator";

export class ResetPassword{
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    resetToken: string;
    @IsNotEmpty()
    newPassword: string;
}