export interface Mission {
  id: string;
  label: string;
  beginDate: string;
  endDate: string;
  missionType: string;
  freelance: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}
