/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    supplyPower(watts: number) {
        console.log(`supplying unit with ${watts} watts`)
    }
}
