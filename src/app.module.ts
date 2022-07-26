import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';
import { PaginateService } from './service/paginate/paginate.service';
@Module({
  imports: [ControllerModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService, PaginateService],
})
export class AppModule {}
