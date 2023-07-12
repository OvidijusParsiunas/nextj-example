import {NextApiRequest, NextApiResponse} from 'next';
import multiparty from 'multiparty';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new multiparty.Form();
  await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject('The endpoint is set up to handle multi-part data');
      } else {
        if (files?.files) {
          console.log('Files:');
          console.log(files);
        }
        if (Object.keys(fields).length > 0) {
          console.log('Text messages:');
          console.log(fields);
        }
        resolve(true);
      }
    });
  });
  // Sends response back to Deep Chat using the Result format
  res.json({result: {text: 'This is a response from Next.js server. Thank you for your message!'}});
}
