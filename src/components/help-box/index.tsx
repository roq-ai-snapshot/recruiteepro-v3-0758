import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Business Owner', 'Recruiter', 'Hiring Manager', 'Admin', 'JobApplicant'];
  const applicationName = 'RecruiteePro v3';
  const tenantName = 'Business Organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. Business Owner:
   a. As a business owner, I want to be able to create and manage my organization's account on the platform, so that I can oversee the hiring process.
   b. As a business owner, I want to be able to assign roles (recruiter, hiring manager, admin) to my team members, so that they can perform their respective tasks in the hiring process.
   c. As a business owner, I want to have access to analytics and reports on the hiring process, so that I can make informed decisions and improve our talent acquisition strategy.
   d. As a business owner, I want to be able to set up custom workflows for different job positions, so that the hiring process can be tailored to our organization's needs.
   e. As a business owner, I want to be able to integrate the platform with our existing HR systems, so that we can maintain a seamless flow of information.

2. Recruiter:
   a. As a recruiter, I want to be able to post job openings on various job boards and social media platforms, so that we can attract a diverse pool of candidates.
   b. As a recruiter, I want to be able to review and filter resumes based on customizable criteria, so that I can identify the most suitable candidates for the job.
   c. As a recruiter, I want to be able to schedule interviews with candidates, so that we can assess their skills and fit for the role.
   d. As a recruiter, I want to be able to collaborate with hiring managers and admins on the platform, so that we can streamline the hiring process.
   e. As a recruiter, I want to be able to send automated emails to candidates, so that we can keep them informed about their application status.

3. Hiring Manager:
   a. As a hiring manager, I want to be able to review candidate profiles and provide feedback, so that we can make informed hiring decisions.
   b. As a hiring manager, I want to be able to collaborate with recruiters and admins on the platform, so that we can streamline the hiring process.
   c. As a hiring manager, I want to be able to track the progress of candidates through the hiring process, so that we can ensure a timely and efficient process.
   d. As a hiring manager, I want to be able to create and manage job offers, so that we can secure the best talent for our organization.

4. Admin:
   a. As an admin, I want to be able to manage user permissions and access, so that we can maintain the security and integrity of our organization's data.
   b. As an admin, I want to be able to configure the platform's settings and integrations, so that we can customize the platform to our organization's needs.
   c. As an admin, I want to be able to manage the onboarding process for new hires, so that we can ensure a smooth transition into our organization.

5. Job Applicant:
   a. As a job applicant, I want to be able to search and apply for job openings on the platform, so that I can find the right opportunity for my career.
   b. As a job applicant, I want to be able to create and manage my profile, so that I can showcase my skills and experience to potential employers.
   c. As a job applicant, I want to be able to track the status of my applications, so that I can stay informed about my progress in the hiring process.
   d. As a job applicant, I want to be able to receive notifications about new job openings and application updates, so that I can stay engaged with the platform and potential employers.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
