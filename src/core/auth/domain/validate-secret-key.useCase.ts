
import { ForbiddenException } from "@nestjs/common";

import { SecretDataSource } from "@datasource/secret.datasource";


export class validateSecretUseCase {

  constructor(private secretModel: SecretDataSource, private secretKey: string) { 
    this.secret = secretKey;
  }
  response: boolean;
  secret: string;
  secretDb: string;
  async main() {

    try {
      await this.getSecretKey();
      this.response = this.validateSecretKey();

    } catch (error) {

      throw error
    }
    return this.response
  }

  private async getSecretKey(){
    const secret = await this.secretModel.getSecretKey()
    if(!secret){
      throw new ForbiddenException('autenticacion fallida!')
    }
    this.secretDb = secret.key;
  }

  private validateSecretKey(): boolean {
    return this.secret == this.secretDb;
  }
}
