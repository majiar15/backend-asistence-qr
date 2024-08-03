import { cutName } from '@common/utils/transform-date';
import { AcademicProgramDataSource } from '@datasource/academic_program.datasource';
import { CoursesDataSource } from '@datasource/course.datasource';
import { AcademicProgram, AcademicProgramDocument } from '@datasource/models/academic_programs.model';
import { StudentDataSource } from '@datasource/student.datasource';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { unlink } from 'fs';
import { Types, Document } from 'mongoose';
import { extname, join } from 'path';
import * as XLSX from 'xlsx';

export class UploadFileUseCase {

    response: { status: boolean; data?: any }

    private academic_programs: (Document<unknown, any, AcademicProgramDocument> & AcademicProgram & Document & {
        _id: Types.ObjectId;
    })[]

    private keyWords = [
        "Código"
    ]
    private studentPaymentStatus: any[] = [];
    private studentsToEnroll: any[] = [];
    constructor(
        private academicProgramDataSource: AcademicProgramDataSource,
        private coursesDataSource: CoursesDataSource,
        private studentDataSource: StudentDataSource,
    ) { }

    async main(file: Express.Multer.File, course_id: string) {

        try {

            await this.getAllAcadeemicPrograms()

            const students = await this.processExcel(file)

            await this.addStudents(students)

            await this.enrollingStudents(course_id,)

            return this.response;
        } catch (error) {
            throw error;
        }
    }

    private async getAllAcadeemicPrograms() {
        this.academic_programs = await this.academicProgramDataSource.getAcademicProgram()

    }

    private async processExcel(file: Express.Multer.File): Promise<any[]> {
        return new Promise((resolve, reject) => {

            try {

                const filePath = join(__dirname, '../../../../uploads', file.filename);
                const fileExtName = extname(file.filename).toLowerCase();

                if (fileExtName != '.xlsx' && fileExtName != '.xls') {

                    throw new BadRequestException(`El formato ${fileExtName} no es permitido. `);
                }


                const workbook = XLSX.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(worksheet);
                let agregar_estudiantes = false;

                let students: any[] = [];

                const allStudents: any[] = [];

                data.forEach((element: any) => {

                    if (students.length > 0) {
                        allStudents.push(students)
                    }
                    students = [];
                    Object.keys(element).forEach(key => {


                        const value = element[key];
                        if (this.keyWords.includes(value)) {

                            agregar_estudiantes = true;
                        }
                        if (agregar_estudiantes && value && value != "X") {

                            students.push(value)
                        }


                    })

                })



                const newStudents = allStudents.slice(1).map((element) => {
                    const { name, surnames } = cutName(element[4] == "*" ? element[5] : element[4]);

                    const find_academic_program = this.academic_programs.find((item) => item.code == parseInt(element[3]))


                    if (element[4] == "*") {
                        this.studentPaymentStatus.push(parseInt(element[2]));
                    };

                    element = {

                        code: element[1],
                        dni: element[2],
                        academic_program: find_academic_program ? find_academic_program._id : this.academic_programs[0]._id,
                        name: name,
                        surnames: surnames,
                        email: element[4] == "*" ? element[6] : element[5],
                        phone: element[4] == "*" ? element[7] : element[6],
                        role: "student",
                        password: element[2],
                    }

                    return element;
                });

                unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error al eliminar el archivo: ${err}`);
                    } else {
                        console.log('Archivo eliminado exitosamente.');
                    }
                });
                resolve(newStudents);


            } catch (error) {
                reject(error);
            }
            // reject()
        })

        // FILA CODIGO  DESDE F18 - F34
        // FILA DNI     DESDE K18 - K34
        // FILA NOMBRE  DESDE S18 - S34
        // FILA EMAIL   DESDE X18 - X34
        // FILA NUMERO  DESDE Z18 - Z34
        // FILA MATRICULASDOS DESDE Q18 - Q34
        //return data;
    }

    private async addStudents(students: any[]) {

        if (students.length <= 0) {
            throw new NotFoundException(`No se encontraron estudiantes en el archivo proporcionado.`);
        }
        
        const dnis = students.map(student => student.dni);

        const existingStudents = await this.studentDataSource.findStudentsByDnis(dnis);

        const existingDnis = new Set(existingStudents.map(student => student.dni));

        const newStudents = students.filter(student => !existingDnis.has(parseInt(student.dni)));

        if(existingStudents.length>0 && newStudents.length<=0){
            this.studentsToEnroll = existingStudents.map(student => {
                const statusPayment = this.studentPaymentStatus.includes(student.dni);
                return { student_id: student._id, payment: !statusPayment }
            });
            return;
        }

        if (newStudents.length <= 0) {
            this.studentsToEnroll = [];
            return;
        }

        const addedStudents = await this.studentDataSource.addStudents(newStudents)

        const combinedResults = [
            ...existingStudents.map(({_id,dni}) => ({ dni,_id})),
            ...addedStudents.map(({ _id, dni }) => ({ dni,_id}))
        ];


        this.studentsToEnroll = combinedResults.map(student => {
            const statusPayment = this.studentPaymentStatus.includes(student.dni);
            return { student_id: student._id, payment: !statusPayment }
        });
       
    }

    private async enrollingStudents(course_id: string) {
        if (!this.studentsToEnroll.length) {
            throw new BadRequestException('No hay estudiantes para matricular en este momento.');
        }

        const course = await this.coursesDataSource.updateCourses(course_id, { students: this.studentsToEnroll })
        if (!course) {
            throw new BadRequestException('No se pudo matricular los estudiantes')
        }
        this.response = { status: true, data: 'Los estudiantes han sido matriculados correctamente en el curso.' }
    }

}