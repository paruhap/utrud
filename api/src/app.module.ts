import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ServicesModule,
    ContentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
