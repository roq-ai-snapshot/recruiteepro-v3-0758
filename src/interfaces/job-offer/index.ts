import { JobApplicationInterface } from 'interfaces/job-application';
import { UserInterface } from 'interfaces/user';

export interface JobOfferInterface {
  id?: string;
  job_application_id: string;
  hiring_manager_id: string;
  salary: number;
  start_date: Date;

  job_application?: JobApplicationInterface;
  user?: UserInterface;
  _count?: {};
}
