import { ResponseDto } from "@common/utils/pagination/dto/paginated.dto";
import { StudentDataSource } from "@datasource/student.datasource";
import { NotFoundException } from "@nestjs/common";






export class ValidateUserUseCase {

    response: ResponseDto<any>;

    constructor(
        private studentDatasource: StudentDataSource,
    ) {

    }

    async main(email: string, dni: number) {

        try {

            await this.validateUser(email, dni);
            return this.response;

        } catch (error) {
            throw error
        }
    }

    private async validateUser(email: string, dni: number) {
        const user = await this.studentDatasource.getStudentByDni(dni);

        if (!user) {
            throw new NotFoundException(`STUDENT_NOT_FOUND`);
        }
        if (user.email !== email) {
            throw new NotFoundException(`EMAIL_MISMATCH`);
        }
        
        const fakePhoneNumbers = Array(3)
            .fill('')
            .map(() => {
                const initialDigits = Math.random() < 0.5 ? '30' : '31';
                const remainingDigits = Math.floor(Math.random() * 100000000)
                    .toString()
                    .padStart(8, '0');
                return `${initialDigits}${remainingDigits}`;
            });

        const allNumbers = [...fakePhoneNumbers];
        const realPhoneIndex = Math.floor(Math.random() * 4);
        allNumbers.splice(realPhoneIndex, 0, user.phone.toString());

        this.response = new ResponseDto<any>(true, allNumbers);
    }

}
