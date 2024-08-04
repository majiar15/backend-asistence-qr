



import * as bcrypt from 'bcrypt';
import { StudentDataSource } from "@datasource/student.datasource";
import { NotFoundException } from "@nestjs/common";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { StudentDocument } from "@datasource/models/student.model";


export class ChangePasswordUseCase {

    private response: { status: boolean; message: string }

    private student: StudentDocument;

    private password: any;

    constructor(
        private studentDatasource: StudentDataSource,
    ) {

    }

    async main(body: ChangePasswordDto) {

        try {
            await this.validateHash(body.dni, body.hash)
            await this.validatePassword(body);
            await this.comparePasswords(body.password);
            await this.encriptPassword(body.password)
            await this.changePassword();
            return this.response;

        } catch (error) {
            throw error
        }
    }



    private async validateHash(dni: number, hash: string) {
        this.student = await this.studentDatasource.getStudentByDni(dni);
        if (!this.student) {
            throw new NotFoundException(`STUDENT_NOT_FOUND`);
        }
        if (this.student.hash != hash) {
            throw new NotFoundException(`HASH_NOT_MATCH`)
        }
    }

    private async validatePassword(body: ChangePasswordDto) {

        if (body.password != body.confirm_password) {
            throw new NotFoundException(`PASSWORDS_NOT_MATCH`)
        }
    }

    private async encriptPassword(password: string) {
        this.password = await bcrypt.hash(password, 10);
    }

    private async comparePasswords(password: string) {
        const checkPassword = await bcrypt.compare(password, this.student.password);
        if (checkPassword) {
            throw new NotFoundException(`PASSWORD_ALREADY_USED`)
        }
    }

    private async changePassword() {

        const student = await this.studentDatasource.updateStudent(this.student._id, { password: this.password, hash: '' })

        if (!student) {
            throw new NotFoundException(`PASSWORD_CHANGE_FAILED`)
        }
        this.response = { status: true, message: 'La contraseña se cambio correctamente.' }
    }

}
