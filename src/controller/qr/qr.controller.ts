import { Body, Controller, Post } from '@nestjs/common';
import { QrConsultDto } from 'src/dto/dto_paymentmethods/qr/qr_consult.dto';
import { QrGenerationDto } from 'src/dto/dto_paymentmethods/qr/qr_generation.dto';
import { QrUpdate } from 'src/enum/connection.enum';
import { QrService } from 'src/service/payment_methods/qr/qr.service';

@Controller('qr')
export class QrController {
    constructor(private qrService: QrService){}
    
    @Post('generate')
    async generateQr(
        @Body() data: QrGenerationDto) {
        return await this.qrService.generateQr(data);
    }

    @Post('consult')
    async consultQr(
        @Body() data: QrConsultDto) {
        return await this.qrService.consultQr(data);
    }

    @Post('update')
    async updateQr(
        @Body() data: QrUpdate) {
        return await this.qrService.updateQr(data);
    }
}
