import type { CallType } from '@/api/types';

const classnames: Record<CallType, string> = {
  missed: 'text-red-500 capitalize',
  voicemail: 'text-primary capitalize',
  answered: 'text-green-500 capitalize',
};

export default function CallTypeCell({ value }: { value: CallType }) {
  return <span className={classnames[value]}>{value}</span>;
}
