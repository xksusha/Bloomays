import { Module } from '@nestjs/common';
import { MissionsController } from './missions/missions.controller'; // Importer le contrôleur des missions
import { MissionsService } from './missions/missions.service'; // Importer le service des missions

@Module({
  controllers: [MissionsController], // Déclarer le contrôleur des missions
  providers: [MissionsService], // Déclarer le service des missions
})
export class AppModule {}
