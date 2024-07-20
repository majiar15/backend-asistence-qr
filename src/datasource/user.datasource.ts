import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./models/user.model";
import { Model } from "mongoose";
import { RegisterAuthDto } from "@core/auth/dto/register-auth.dto";

export class UserDataSource {
    constructor(
        @InjectModel(Users.name) private users: Model<Users>,
    ) {}

    getUserByDni(dni: number){
        return this.users.findOne({ dni })
        .select('-delete');
    }
    saveUser(user: RegisterAuthDto){
        return this.users.create(user);
    }

    getAllUser(role:string,page: number, limit: number){
        return this.users.find({role,delete:false})
            .select('-password')
            .select('-delete')
            .limit(limit)
            .skip((page -1) * limit);
    }

    getUserById(id:string){
        return this.users.findOne({ _id: id, delete: false })
        .select('-delete')
        .select('-password');
    }

    getUserCount(role:string){
        return this.users.countDocuments({role, delete: false })
    }
 
    updateUser(id:string,data){
        return this.users.findByIdAndUpdate(id,data,{ new: true }) 
    }

    deleteUser(id:string){
        return this.users.findByIdAndUpdate(id,{delete:true},{ new: true })
        .select('-password')
    }
}