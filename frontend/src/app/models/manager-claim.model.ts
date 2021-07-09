export interface ManagerClaimModel {
  id: number;
  description: string;
  start_date: Date;
  end_date: Date;
  reduction: number;
  partner: string;
  validated: boolean;
  personID: number;
  firstName: string;
  lastName: string;
}
