import { Controller, Get, Param } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { Mission } from './missions.interface';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Get()
  async getAllMissions(): Promise<Mission[]> {
    return this.missionsService.getAllMissions();
  }

  @Get(':id')
  async getMissionById(@Param('id') id: string): Promise<Mission> {
    return this.missionsService.getMissionById(id);
  }
}
