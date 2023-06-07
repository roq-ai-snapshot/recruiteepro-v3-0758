import * as yup from 'yup';
import { interviewValidationSchema } from 'validationSchema/interviews';
import { jobOfferValidationSchema } from 'validationSchema/job-offers';
import { onboardingValidationSchema } from 'validationSchema/onboardings';

export const jobApplicationValidationSchema = yup.object().shape({
  status: yup.string().required(),
  job_opening_id: yup.string().nullable().required(),
  applicant_id: yup.string().nullable().required(),
  interview: yup.array().of(interviewValidationSchema),
  job_offer: yup.array().of(jobOfferValidationSchema),
  onboarding: yup.array().of(onboardingValidationSchema),
});
