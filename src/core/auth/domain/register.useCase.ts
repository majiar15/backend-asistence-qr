
import { UserDataSource } from "@datasource/user.datasource";
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from "../dto/register-auth.dto";
import { Role } from "@common/utils/rol.enum";


export class RegisterUseCase {
  user!: RegisterAuthDto;
  role: Role
  constructor(private userDatasource: UserDataSource, role: Role) { 
    this.role = role;
  }

  async main(userRegister: RegisterAuthDto) {

    try {

      await this.hashPassword(userRegister)
      const response = await this.saveUser()
      return response;

    } catch (error) {

      throw error
    }
  }



  private async hashPassword(userRegister: RegisterAuthDto) {

    const passwordHash = await bcrypt.hash(userRegister.password, 10);
    this.user = { ...userRegister, password: passwordHash };

  }
  private async saveUser() {
    return this.userDatasource.saveUser(this.user);
  }
}
