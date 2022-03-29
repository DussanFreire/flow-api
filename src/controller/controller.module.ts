import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';

@Module({
  imports: [ServiceModule],
  controllers: [LoginController, RegisterController],
})
export class ControllerModule {}
