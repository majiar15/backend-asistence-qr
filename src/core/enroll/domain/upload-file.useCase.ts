import { extname, join } from 'path';
import * as XLSX from 'xlsx';

export class UploadFileUseCase {



    constructor(

    ) { }

    async main(file: Express.Multer.File) {
        console.log("🚀 ~ UploadFileUseCase ~ main ~ file:", file)

        try {


            //const workbook = XLSX.readFile(file.path);
            const filePath = join(__dirname, '../../../../uploads', file.filename);
            const fileExtName = extname(file.filename).toLowerCase();

            if (fileExtName === '.xlsx' || fileExtName === '.xls') {
                const data = this.processExcel(filePath)
                return data;
            }
            return { status: true, data: 'Archivo recibodo en backend' }
        } catch (error) {
            throw error;
        }
    }

    async processExcel(filePath: string) {



        return new Promise((resolve, reject) => {

            try {
                const workbook = XLSX.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(worksheet);
                let agregar_estudiantes = false;

                let students: any[] = [];

                const allStudents: any[] = [];
                console.log("🚀 ~ UploadFileUseCase ~ returnnewPromise ~ arraySupremo:", allStudents)
                data.forEach((element: any) => {

                    if (students.length > 0) {
                        allStudents.push(students)
                    }
                    students = [];
                    Object.keys(element).forEach(key => {


                        const value = element[key];
                        if (this.keyWords.includes(value)) {
                            console.log(`🚀 ~ Key: ${key}, Value: ${value}`);
                            agregar_estudiantes = true;
                        }
                        if (agregar_estudiantes && value) {

                            students.push(value)
                        }


                    })

                })

                const newStudents = allStudents.slice(1).map((element) => ({
                    number: element[0],
                    code: element[1],
                    dni: element[2],
                    code_program: element[3],
                    name: element[4],
                    email: element[5],
                    phone: element[6],
                  }));
              
                  resolve(newStudents);

                // const newStudents = [];
                // allStudents.forEach((element, index) => {
                //     if (index === 0) return; // Omitir el primer elemento (encabezado)

                //     const student = {
                //         number: element[0],
                //         code: element[1],
                //         dni: element[2],
                //         code_program: element[3],
                //         name: element[4],
                //         email: element[5],
                //         phone: element[6]
                //     };
                //     newStudents.push(student);
                // })

                // resolve(newStudents);
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
    keyWords = [
        "Código"
    ]
}