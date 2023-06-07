import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createJobOffer } from 'apiSdk/job-offers';
import { Error } from 'components/error';
import { jobOfferValidationSchema } from 'validationSchema/job-offers';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { JobApplicationInterface } from 'interfaces/job-application';
import { UserInterface } from 'interfaces/user';
import { getJobApplications } from 'apiSdk/job-applications';
import { getUsers } from 'apiSdk/users';
import { JobOfferInterface } from 'interfaces/job-offer';

function JobOfferCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: JobOfferInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createJobOffer(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<JobOfferInterface>({
    initialValues: {
      salary: 0,
      start_date: new Date(new Date().toDateString()),
      job_application_id: (router.query.job_application_id as string) ?? null,
      hiring_manager_id: (router.query.hiring_manager_id as string) ?? null,
    },
    validationSchema: jobOfferValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Job Offer
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="salary" mb="4" isInvalid={!!formik.errors?.salary}>
            <FormLabel>Salary</FormLabel>
            <NumberInput
              name="salary"
              value={formik.values?.salary}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('salary', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.salary && <FormErrorMessage>{formik.errors?.salary}</FormErrorMessage>}
          </FormControl>
          <FormControl id="start_date" mb="4">
            <FormLabel>Start Date</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.start_date}
              onChange={(value: Date) => formik.setFieldValue('start_date', value)}
            />
          </FormControl>
          <AsyncSelect<JobApplicationInterface>
            formik={formik}
            name={'job_application_id'}
            label={'Select Job Application'}
            placeholder={'Select Job Application'}
            fetcher={getJobApplications}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.job_opening_id}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'hiring_manager_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'job_offer',
  operation: AccessOperationEnum.CREATE,
})(JobOfferCreatePage);
