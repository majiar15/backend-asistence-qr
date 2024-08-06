import { IsNotEmpty, IsString } from "class-validator";

export class UpdateSecretDTO {
    @IsNotEmpty()
    @IsString()
    bitacora_id:string;

    @IsNotEmpty()
    @IsString()
    secret: string;
}
