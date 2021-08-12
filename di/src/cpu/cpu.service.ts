/* eslint-disable prettier/prettier */
import { PowerService } from './../power/power.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) { }
  compute(a: number, b: any) {
    console.log("drawing 10 watts of power from powerservice")
    this.powerService.supplyPower(10)
    return a + b
  }
}

