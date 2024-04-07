import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  //mongodb+srv://assistance-qr-unilibre:<password>@assistance-qr.qi28uqw.mongodb.net/?retryWrites=true&w=majority

}
