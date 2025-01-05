import { Module } from '@nestjs/common';
import { HistoricalService } from './historical.service';
import { HistoricalController } from './historical.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historical } from './entities/historical.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Historical]),
   ],
  controllers: [HistoricalController],
  providers: [HistoricalService],
  exports: [HistoricalService],
})
export class HistoricalModule {}
