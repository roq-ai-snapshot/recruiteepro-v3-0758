import { InterviewInterface } from 'interfaces/interview';
import { JobOfferInterface } from 'interfaces/job-offer';
import { OnboardingInterface } from 'interfaces/onboarding';
import { JobOpeningInterface } from 'interfaces/job-opening';
import { UserInterface } from 'interfaces/user';

export interface JobApplicationInterface {
  id?: string;
  job_opening_id: string;
  applicant_id: string;
  status: string;
  interview?: InterviewInterface[];
  job_offer?: JobOfferInterface[];
  onboarding?: OnboardingInterface[];
  job_opening?: JobOpeningInterface;
  user?: UserInterface;
  _count?: {
    interview?: number;
    job_offer?: number;
    onboarding?: number;
  };
}
