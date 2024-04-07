import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './models/user.model';
import { UserDataSource } from './user.datasource';



@Module({
    imports: [
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    ],
    controllers: [],
    exports: [ UserDataSource ],
    providers: [ UserDataSource ]
})
export class dataSourceModule { }
