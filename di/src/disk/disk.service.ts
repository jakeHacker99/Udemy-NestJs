/* eslint-disable prettier/prettier */
import { PowerService } from './../power/power.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiskService {
    constructor(private powerService: PowerService) { }
    getData() {
        console.log('drawing 20 watts of power from powerservice');
        this.powerService.supplyPower(20)
        return 'data!';
    }
}
