import { Test, TestingModule } from '@nestjs/testing';
import { ParkingCapacityService } from './parking-capacity.service';

describe('ParkingCapacityService', () => {
  let service: ParkingCapacityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingCapacityService],
    }).compile();

    service = module.get<ParkingCapacityService>(ParkingCapacityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
