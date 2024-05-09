import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Schedule } from "./models/schedule.model";


export class ScheduleDataSource {
    constructor(
        @InjectModel(Schedule.name) private schedule: Model<Schedule>,
    ) {}

    saveSchedule(schedule: any[]){
        return this.schedule.create(schedule);
        
    }

    getSchedule(course_id:string){
        return this.schedule.find({course_id:course_id})
    }
}