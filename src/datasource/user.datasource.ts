import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./models/user.model";
import { Model } from "mongoose";
import { RegisterAuthDto } from "@core/auth/dto/register-auth.dto";

export class UserDataSource {
    constructor(
        @InjectModel(Users.name) private users: Model<Users>,
    ) {}

    getUserByEmail(email: string){
        return this.users.findOne({ email });
    }
    saveUser(user: RegisterAuthDto){
        return this.users.create(user);
    }
}