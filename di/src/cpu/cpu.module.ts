import { DiskModule } from './../disk/disk.module';
import { PowerModule } from './../power/power.module';
import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';

@Module({
  providers: [CpuService],
  imports: [DiskModule, CpuModule, PowerModule],
  exports: [CpuService]
})
export class CpuModule { }
