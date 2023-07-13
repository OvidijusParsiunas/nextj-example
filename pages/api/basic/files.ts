import {DeepChatTextRequestBody} from '../../../types/deepChatTextRequestBody';
import {NextRequest, NextResponse} from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    // files are stored inside form data
    const formData = await req.formData();
    formData.forEach((data) => {
      if (data instanceof File) {
        console.log('File:');
        console.log(data);
      } else {
        // if a message is sent along with files, it will also be in form data
        console.log('Message:');
        console.log(data);
      }
    });
  } catch (_) {
    // if no files are sent - text will be in req.json
    const messageRequestBody = (await req.json()) as DeepChatTextRequestBody;
    console.log(messageRequestBody);
  }
  // Sends response back to Deep Chat using the Result format:
  // https://deepchat.dev/docs/connect/#Result
  return NextResponse.json({result: {text: 'This is a response from Next.js server. Thank you for your message!'}});
}
