
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { AcademicProgram } from "./models/academic_programs.model";


export class AcademicProgramDataSource {
    constructor(
        @InjectModel(AcademicProgram.name) private academicProgram: Model<AcademicProgram>,
    ) {}


    getAcademicProgram(){
        return this.academicProgram.find({})
    }
}