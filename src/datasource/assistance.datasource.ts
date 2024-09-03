import { InjectModel } from "@nestjs/mongoose";
import { Assistance, AssistanceDocument } from "./models/assistance.model";
import mongoose, { Model } from "mongoose";

export class AssistanceDataSource {
    constructor(
        @InjectModel(Assistance.name)
        private readonly Assistance: Model<AssistanceDocument>,
    ) { }


    async takeAssistance(course_id: string, student_id: string, date: Date, isLateArrive: boolean = false) {
        return this.Assistance.create({
            student_id,
            date,
            course_id,
            late: isLateArrive
        })
    }
    async getAssistance(course_id: string, student_id: string, date: Date) {
        return this.Assistance.findOne({
            student_id,
            date,
            course_id
        })
    }
    async getAssistanceByCourse(course_id: string, date: Date) {
        return this.Assistance.find({
            date,
            course_id
        })
    }
    async getLastAssistance(course_id: string) {
        return this.Assistance.findOne({ course_id })
            .sort({ date: -1 })
            .exec();
    }
    async getAssistanceByDate(date: Date, course_id: string) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        endOfDay.setUTCHours(23, 59, 59, 999);
        return this.Assistance.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            course_id
        })
            .exec();
    }
    async getAssistanceForCourse(course_id: string) {
        return this.Assistance.aggregate([
            {
                $match: { course_id: new mongoose.Types.ObjectId(course_id) }
            },
            {
                $lookup: {
                    from: 'students', // Nombre de la colección donde están los estudiantes
                    localField: 'student_id',
                    foreignField: '_id',
                    as: 'student'
                }
            },
            { $unwind: '$student' }, // Desenrollamos el array resultante de $lookup
            {
                $lookup: {
                    from: 'academic_programs', // Nombre de la colección de programas académicos
                    localField: 'student.academic_program',
                    foreignField: '_id',
                    as: 'academic_program'
                }
            },
            { $unwind: '$academic_program' },
            {
                $lookup: {
                    from: 'courses', // Nombre de la colección donde están los cursos
                    localField: 'course_id',
                    foreignField: '_id',
                    as: 'course'
                }
            },
            { $unwind: '$course' }, // Desenrollamos el array resultante de $lookup
            {
                $group: {
                    _id: {
                        studentId: "$student._id",
                        dni: "$student.dni",
                        code: "$student.code",
                        name: "$student.name",
                        surnames: "$student.surnames",
                        course: "$course.name",
                        academicProgram: "$academic_program.code"
                    },
                    dates: {
                        $push: {
                            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                            late: "$late"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: "$_id.studentId",
                    dni: "$_id.dni",
                    code: "$_id.code",
                    name: "$_id.name",
                    surnames: "$_id.surnames",
                    course: "$_id.course",
                    academicProgram: "$_id.academicProgram",
                    dates: 1
                }
            }
        ]);
    }

    async getStudentAssistanceByCourse(student_id: string,course_id:string) {
        
        return this.Assistance.find({
            student_id,
            course_id
        }).exec();
    }
}