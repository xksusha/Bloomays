import { Injectable } from '@nestjs/common';
import { Mission } from './missions.interface';
/* eslint-disable */
const Airtable = require('airtable');
/* eslint-enable */

@Injectable()
export class MissionsService {
  private readonly airtable: typeof Airtable;

  constructor() {
    // Replace 'YOUR_API_KEY' with your actual Airtable API key
    const apiKey = process.env.AIRTABLE_API_KEY;
    // Replace 'YOUR_BASE_ID' with your actual Airtable base ID
    const baseId = process.env.BASE_ID;
    console.log(baseId, apiKey)
    this.airtable = new Airtable({ apiKey }).base(baseId);
  }

  async getAllMissions(): Promise<Mission[]> {
    // Fetch all records from the 'Missions' table
    const missions = await this.airtable('Missions').select().all();
    const freelancers = await this.airtable('Freelancers').select().all();
    const freelancersMap = freelancers.reduce(
      (acc: Map<number, Mission['freelance']>, freelance: any) => {
        acc[freelance.fields.id] = freelance.fields;
        return acc;
      },
      {},
    );

    // Map the fetched records to Mission objects
    return missions.map(
      (record: any) =>
        ({
          ...record.fields,
          freelance: freelancersMap[record.fields.freelanceId],
        } as Mission),
    );
  }

  async getMissionById(id: string): Promise<Mission> {
    // Fetch a specific mission record from the 'Missions' table by its ID
    const mission = await this.airtable('Missions').find(id);

    // Return the mission record as a Mission object
    return mission.fields as Mission;
  }
}
