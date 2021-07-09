export interface ClaimModel {
  id: number;
  description: string;
  start_date: Date;
  end_date: Date;
  reduction: number;
  partner: string;
  validated: boolean;
}
