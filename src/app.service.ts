import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  //mongodb+srv://assistance-qr-unilibre:<password>@assistance-qr.qi28uqw.mongodb.net/?retryWrites=true&w=majority
  //VIDEO:https://www.youtube.com/watch?v=2P-Bxrtser4&list=PL_WGMLcL4jzWCFea1NUVOfaf4IqIMFN4P&index=3
  //TIEMPO: 21:54
}
