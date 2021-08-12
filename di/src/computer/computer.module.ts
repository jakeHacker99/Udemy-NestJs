import { DiskModule } from './../disk/disk.module';
import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import { CpuModule } from 'src/cpu/cpu.module';

@Module({
  controllers: [ComputerController],
  imports: [DiskModule, CpuModule]
})
export class ComputerModule { }
