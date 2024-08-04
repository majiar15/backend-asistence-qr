

import { generateRandomString } from "@common/utils/generals";
import { StudentDataSource } from "@datasource/student.datasource";
import { NotFoundException } from "@nestjs/common";


export class ValidatePhoneUseCase {

    response: { status: boolean; data: any }

    constructor(
        private studentDatasource: StudentDataSource,
    ) { }

    async main(email: string, dni: number, phone: number) {

        try {

            await this.validatePhone(email, dni, phone);

            return this.response;

        } catch (error) {
            throw error
        }
    }

    async validatePhone(email: string, dni: number, phone: number) {

        const user = await this.studentDatasource.getStudentByDni(dni);
        if (!user) {
            throw new NotFoundException(`STUDENT_NOT_FOUND`);
        }

        if (user && phone != user.phone) {
            throw new NotFoundException(`INVALID_PHONE_NUMBER`)
        }
        const tokenhash = generateRandomString()
        await this.studentDatasource.updateStudent(user._id, { hash: tokenhash })

        this.response = { status: true, data: { hash: tokenhash } }

    }


}
