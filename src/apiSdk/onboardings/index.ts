import axios from 'axios';
import queryString from 'query-string';
import { OnboardingInterface } from 'interfaces/onboarding';
import { GetQueryInterface } from '../../interfaces';

export const getOnboardings = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/onboardings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOnboarding = async (onboarding: OnboardingInterface) => {
  const response = await axios.post('/api/onboardings', onboarding);
  return response.data;
};

export const updateOnboardingById = async (id: string, onboarding: OnboardingInterface) => {
  const response = await axios.put(`/api/onboardings/${id}`, onboarding);
  return response.data;
};

export const getOnboardingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/onboardings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOnboardingById = async (id: string) => {
  const response = await axios.delete(`/api/onboardings/${id}`);
  return response.data;
};
