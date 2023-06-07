import * as yup from 'yup';

export const onboardingValidationSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  job_application_id: yup.string().nullable().required(),
  admin_id: yup.string().nullable().required(),
});
