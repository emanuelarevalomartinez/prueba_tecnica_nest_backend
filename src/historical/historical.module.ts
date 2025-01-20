import { Module } from '@nestjs/common';
import { HistoricalService } from './historical.service';
import { HistoricalController } from './historical.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historical } from './entities/historical.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Historical]),
    UserModule,
   ],
  controllers: [HistoricalController],
  providers: [HistoricalService],
  exports: [HistoricalService],
})
export class HistoricalModule {}
