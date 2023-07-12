import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(req.body);

    res.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Encoding': 'none',
      'Cache-Control': 'no-cache, no-transform',
      'Content-Type': 'text/event-stream',
    });

    const responseChunks = 'This is a response from a NextJS server. Thank you for your message!'.split(' ');

    const startTime = Date.now();
    sendStream(res, responseChunks, startTime);
  } catch (err) {
    console.log('>>>>>>>>>>>>>> STRIPE SEND MESSAGE : ERROR >>>>>>>>>>>>>>>>>>');
    console.log(JSON.stringify(err));
    throw err;
  }

  function sendStream(res: NextApiResponse, responseChunks: string[], startTime: number) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const chunkIndex = Math.floor(elapsedTime / 70);

    if (chunkIndex < responseChunks.length) {
      const chunk = responseChunks[chunkIndex];
      res.write(`data: ${JSON.stringify({ result: { text: `${chunk} ` } })}\n\n`);

      setTimeout(() => {
        sendStream(res, responseChunks, startTime);
      }, 70);
    } else {
      res.end();
    }
  }
}
