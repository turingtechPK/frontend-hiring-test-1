import { redirect } from 'next/navigation';

type Props = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export default function Page({ params }: Props) {
  return redirect(`/calls?id=${params.id}`);
} 