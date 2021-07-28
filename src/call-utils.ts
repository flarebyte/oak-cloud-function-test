const senderSeparator = ' -> ';
const noEmptyString = (value: string): boolean => value.length > 0;

export const joinSenders = (senders: string[]): string =>
  senders.filter(noEmptyString).join(senderSeparator);
export const splitSenders = (sender: string): string[] =>
  sender.split(senderSeparator).filter(noEmptyString);

export const addChildToSender = (parent: string, child: string): string =>
  joinSenders([parent, child]);
