import { InjectModel } from "@nestjs/mongoose";
import { Device, DeviceDocument } from "./models/device.model";
import { Model } from "mongoose";

export class DeviceDataSource {
    constructor(
        @InjectModel(Device.name)
        private readonly device: Model<DeviceDocument>,
        
    ) {}

    async saveDevice(data:any){
        return this.device.create(data)
    }

    async getDevice(query:any){
        return this.device.findOne(query).exec();
    }

    async updateDevice(query:any,data:any){
        return this.device.findOneAndUpdate(query,data).exec();
    }


}