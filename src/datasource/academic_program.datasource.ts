import { InjectModel } from "@nestjs/mongoose";
import { AcademicProgram, AcademicProgramDocument } from "./models/academic_programs.model";
import { Model } from "mongoose";

export class AcademicProgramDataSource {
    constructor(
        @InjectModel(AcademicProgram.name) 
        private readonly academicProgram: Model<AcademicProgramDocument>,
    ) { }


    async getAcademicProgram() {
        return this.academicProgram.find({}).select('_id name faculty code').exec()
    }
}