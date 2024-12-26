import { Test, TestingModule } from '@nestjs/testing';
import { ParkingCapacityController } from './parking-capacity.controller';
import { ParkingCapacityService } from './parking-capacity.service';

describe('ParkingCapacityController', () => {
  let controller: ParkingCapacityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingCapacityController],
      providers: [ParkingCapacityService],
    }).compile();

    controller = module.get<ParkingCapacityController>(ParkingCapacityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
