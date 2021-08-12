/* eslint-disable prettier/prettier */
import { Get } from '@nestjs/common';
import { DiskService } from './../disk/disk.service';
import { CpuService } from './../cpu/cpu.service';
import { Controller } from '@nestjs/common';

@Controller('computer')
export class ComputerController {
    constructor(private cpuService: CpuService, private diskService: DiskService) { };
    @Get()
    run() {
        return [this.cpuService.compute(2, 2), this.diskService.getData()]
    }
}
