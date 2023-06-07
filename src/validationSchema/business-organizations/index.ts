import * as yup from 'yup';
import { jobOpeningValidationSchema } from 'validationSchema/job-openings';

export const businessOrganizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  job_opening: yup.array().of(jobOpeningValidationSchema),
});
