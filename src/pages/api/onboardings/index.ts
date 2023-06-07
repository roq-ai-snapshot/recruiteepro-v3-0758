import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { onboardingValidationSchema } from 'validationSchema/onboardings';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOnboardings();
    case 'POST':
      return createOnboarding();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOnboardings() {
    const data = await prisma.onboarding
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'onboarding'));
    return res.status(200).json(data);
  }

  async function createOnboarding() {
    await onboardingValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.onboarding.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
