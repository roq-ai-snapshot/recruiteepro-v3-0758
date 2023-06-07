import axios from 'axios';
import queryString from 'query-string';
import { JobOfferInterface } from 'interfaces/job-offer';
import { GetQueryInterface } from '../../interfaces';

export const getJobOffers = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/job-offers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createJobOffer = async (jobOffer: JobOfferInterface) => {
  const response = await axios.post('/api/job-offers', jobOffer);
  return response.data;
};

export const updateJobOfferById = async (id: string, jobOffer: JobOfferInterface) => {
  const response = await axios.put(`/api/job-offers/${id}`, jobOffer);
  return response.data;
};

export const getJobOfferById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/job-offers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteJobOfferById = async (id: string) => {
  const response = await axios.delete(`/api/job-offers/${id}`);
  return response.data;
};
