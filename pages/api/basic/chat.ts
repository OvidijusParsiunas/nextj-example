import {NextRequest, NextResponse} from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const messageRequestBody = (await req.json()) as {messages: {role: string; text: string}[]};
    console.log(messageRequestBody);
    // sends response back to Deep Chat using the Result format:
    // https://deepchat.dev/docs/connect/#Result
    return NextResponse.json({result: {text: 'This is a respone from a NextJS edge server. Thankyou for your message!'}});
  } catch (err) {
    console.log('>>>>>>>>>>>>>> STRIPE SEND MESSAGE : ERROR >>>>>>>>>>>>>>>>>>');
    console.log(JSON.stringify(err));
    throw err;
  }
}
