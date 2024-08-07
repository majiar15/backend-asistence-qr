import { InjectModel } from "@nestjs/mongoose";
import { ContactSupport, ContactSupportDocument } from "./models/contact_support.model";
import { Model } from "mongoose";



export class ContactSupportDataSource {
    constructor(
        @InjectModel(ContactSupport.name) 
        private readonly contactSupport: Model<ContactSupportDocument>,
    ) { }


    async create(data:any) {
        return this.contactSupport.create(data)
    }
}