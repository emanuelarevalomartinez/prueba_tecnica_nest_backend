import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HistoricalService } from './historical.service';
import { CreateHistoricalDto } from './dto/create-historical.dto';
import { UpdateHistoricalDto } from './dto/update-historical.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Autentication } from 'src/user/decorators/auentication';
import { Roles } from 'src/user/enums/roles';
import { GetAllHistoricResponse } from './dto/historical-response';
import { HistoricGenericBadResponse } from './dto/historical-bad-response';

@ApiTags("Historical")
@Controller('historical')
export class HistoricalController {
  constructor(private readonly historicalService: HistoricalService) {}

  @Get()
  @Autentication( Roles.ADMIN )
  @ApiBearerAuth('access-token') 
  @ApiParam({ 
    name: 'page', 
    required: false, 
    description: 'Page to show', 
  }) 
  @ApiParam({ 
    name: 'limit', 
    required: false, 
    description: 'Limit of historic to see', 
  })
  @ApiResponse({ status: 201, description: "Get all historics activities on parking", type: GetAllHistoricResponse })
  @ApiResponse({ status: 500, description: "Error, All historics activities was not found", type: HistoricGenericBadResponse })
  findAll(@Query('page') page: string, @Query('limit') limit: string) {
    return this.historicalService.findAll(page, limit);
  }
}
