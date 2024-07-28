import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Schedule, ScheduleDocument } from "./models/schedule.model";


export class ScheduleDataSource {
    constructor(
        @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
    ) { }

    getSchedule(course_id: string): Promise<ScheduleDocument[]> {
        return this.scheduleModel.find({ course_id: course_id })
    }

    saveSchedule(schedule: any[]): Promise<ScheduleDocument[]> {
        return this.scheduleModel.insertMany(schedule) as unknown as Promise<ScheduleDocument[]>;;

    }

    updateSchedule(schedule: any[]) {
        const bulkOps = schedule.map(schedule => ({
            updateOne: {
                filter: { _id: schedule._id },
                update: { $set: schedule }
            }
        }));
        return this.scheduleModel.bulkWrite(bulkOps);
    }

    deleteSchedules(course_id:string){
        return this.scheduleModel.updateMany({course_id:course_id},{delete:true}).exec()
    }

}