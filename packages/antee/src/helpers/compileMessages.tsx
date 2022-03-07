import {
  parse,
  MessageFormatElement,
} from '@formatjs/icu-messageformat-parser';

export type Messages = Record<string, MessageFormatElement[]>;

const compileMessages = (
  msgs: Record<string, { message: string; description?: string }>,
) => {
  const compiled: Record<string, string> = {};

  const messageAsts: Record<string, MessageFormatElement[]> = {};

  for (const [id, msg] of Object.entries(msgs)) {
    compiled[id] = msg.message;
    messageAsts[id] = parse(compiled[id]);
  }

  // // eslint-disable-next-line guard-for-in
  // for (const id in compiled) {
  //   messageAsts[id] = parse(compiled[id]);
  // }

  return messageAsts;
};

export default compileMessages;
