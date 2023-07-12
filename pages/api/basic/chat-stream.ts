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
    const responseChunks = 'This is a respone from a NextJS server. Thankyou for your message!'.split(' ');
    sendStream(res, responseChunks);
  } catch (err) {
    console.log('>>>>>>>>>>>>>> STRIPE SEND MESSAGE : ERROR >>>>>>>>>>>>>>>>>>');
    console.log(JSON.stringify(err));
    throw err;
  }

  function sendStream(res: NextApiResponse, responseChunks: string[], chunkIndex = 0) {
    setTimeout(() => {
      const chunk = responseChunks[chunkIndex];
      if (chunk) {
        // sends response back to Deep Chat using the Result format:
        // https://deepchat.dev/docs/connect/#Result
        res.write(`data: ${JSON.stringify({result: {text: `${chunk} `}})}\n\n`);
        sendStream(res, responseChunks, chunkIndex + 1);
      } else {
        res.end();
      }
    }, 70);
  }
}
