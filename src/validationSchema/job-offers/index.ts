import * as yup from 'yup';

export const jobOfferValidationSchema = yup.object().shape({
  salary: yup.number().integer().required(),
  start_date: yup.date().required(),
  job_application_id: yup.string().nullable().required(),
  hiring_manager_id: yup.string().nullable().required(),
});
