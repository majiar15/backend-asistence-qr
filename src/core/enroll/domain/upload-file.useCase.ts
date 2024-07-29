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
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log("🚀 ~ UploadFileUseCase ~ processExcel ~ data:", data)
        console.log("🚀 ~ UploadFileUseCase ~ processExcel ~ workbook:", workbook)

        // FILA CODIGO  DESDE F18 - F34
        // FILA DNI     DESDE K18 - K34
        // FILA NOMBRE  DESDE S18 - S34
        // FILA EMAIL   DESDE X18 - X34
        // FILA NUMERO  DESDE Z18 - Z34
        // FILA MATRICULASDOS DESDE Q18 - Q34
        return data;
    }


}