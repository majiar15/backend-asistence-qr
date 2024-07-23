
import { AcademicProgramDataSource } from "@datasource/academic_program.datasource";
import { Types,Document } from "mongoose";


export class GetAllAcademicProgramUseCase{

    response: { status: boolean; data: Document<unknown, {}, any> & any & { _id: Types.ObjectId; }; }

    constructor(private academicProgramDataSource: AcademicProgramDataSource){}

    async main(){
        try {
            await this.getAllAcademicProgram();
            return this.response;
        } catch (error) {
            throw error;
        }

    }

    async getAllAcademicProgram(){
        const data= await this.academicProgramDataSource.getAcademicProgram()
        this.response= {status:true,data}
    }
}