import { JobApplicationInterface } from 'interfaces/job-application';
import { UserInterface } from 'interfaces/user';

export interface OnboardingInterface {
  id?: string;
  job_application_id: string;
  admin_id: string;
  start_date: Date;
  end_date: Date;

  job_application?: JobApplicationInterface;
  user?: UserInterface;
  _count?: {};
}
