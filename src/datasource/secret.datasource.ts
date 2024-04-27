import { Model } from "mongoose";
import { Secret, secretDocument } from "./models/secret.model";
import { InjectModel } from "@nestjs/mongoose";


export class SecretDataSource {
    constructor(
        @InjectModel(Secret.name)
        private readonly secret: Model<secretDocument>,
    ) {}

    async getSecretKey(){
        return await this.secret.findOne({ name: 'key-master'});
    }
}