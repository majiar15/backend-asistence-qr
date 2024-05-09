import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./models/user.model";
import { Model } from "mongoose";
import { RegisterAuthDto } from "@core/auth/dto/register-auth.dto";

export class UserDataSource {
    constructor(
        @InjectModel(Users.name) private users: Model<Users>,
    ) {}

    getUserByDni(dni: number){
        return this.users.findOne({ dni });
    }
    saveUser(user: RegisterAuthDto){
        return this.users.create(user);
    }

    getAllUser(role:string){
        return this.users.find({role,delete:false}).select('-password');
    }

    getUserById(id:string){
        return this.users.findOne({ _id: id, delete: false }).select('-password');
    }

 
    updateUser(id:string,data){
        return this.users.findByIdAndUpdate(id,data,{ new: true }) 
    }

    deleteUser(id:string){
        return this.users.findByIdAndUpdate(id,{delete:true},{ new: true })
    }
}