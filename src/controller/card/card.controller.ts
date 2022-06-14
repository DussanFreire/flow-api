import { Body, Controller, Post } from '@nestjs/common';
import { CardConfirmDto } from 'src/dto/dto_paymentmethods/card/card_confirm.dto';
import { CardConsultDto } from 'src/dto/dto_paymentmethods/card/card_consult.dto';
import { CardPreparationDto } from 'src/dto/dto_paymentmethods/card/card_preparation.dto';
import { CardReturnDto } from 'src/dto/dto_paymentmethods/card/card_return.dto';
import { CardService } from 'src/service/payment_methods/card/card.service';

@Controller('card')
export class CardController {
    constructor(private cardService: CardService) { }

    @Post('preparation')
    async preparationCard(
        @Body() data: CardPreparationDto) {
        return await this.cardService.preparationCard(data);
    }

    @Post('confirm')
    async confirmCard(
        @Body() data: CardConfirmDto) {
        return await this.cardService.confirmCard(data);
    }

    @Post('consult')
    async consultCard(
        @Body() data: CardConsultDto) {
        return await this.cardService.consultCard(data);
    }

    @Post('return')
    async returnCard(
        @Body() data: CardReturnDto) {
        return await this.cardService.returnCard(data);
    }

}
