import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleStrategy } from './auth/google.strategy';
import { ControllerModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';
import { PaginateService } from './service/paginate/paginate.service';
@Module({
  imports: [ControllerModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, PaginateService],
})
export class AppModule {}
