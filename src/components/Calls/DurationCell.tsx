export default function DurationCell({ value }: { value: number }) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return (
    <span className="flex flex-col min-w-fit">
      <span>
        {minutes ? `${minutes} minutes` : ''} {seconds} seconds
      </span>
      <span className="text-primary">({value} seconds)</span>
    </span>
  );
}
