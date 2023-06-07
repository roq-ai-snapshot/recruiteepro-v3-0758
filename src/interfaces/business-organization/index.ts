import { JobOpeningInterface } from 'interfaces/job-opening';
import { UserInterface } from 'interfaces/user';

export interface BusinessOrganizationInterface {
  id?: string;
  name: string;
  user_id: string;
  job_opening?: JobOpeningInterface[];
  user?: UserInterface;
  _count?: {
    job_opening?: number;
  };
}
