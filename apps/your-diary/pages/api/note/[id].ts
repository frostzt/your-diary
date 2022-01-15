import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import Note from '../../../models/note.model';
import connectToDatabase from '../../../utils/db';

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Check authentication
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ errors: [{ message: "You're not authenticated!" }] });
  }

  switch (method) {
    case 'DELETE': {
      const { id } = req.query;
      await Note.findByIdAndDelete(id);
      return res.status(200).json({ data: { note: 'deleted' } });
    }

    // If the request type is not supported
    default:
      return res.status(400).json({
        errors: [{ message: 'This method is not allowed on this route!' }],
      });
  }
}
