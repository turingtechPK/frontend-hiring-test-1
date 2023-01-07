export default function Loader({ text }: { text: string }) {
  return (
    <div className="spinner-container">
      <span>{text}</span>
      <div className="spinner-border text-tt-primary" role="status"></div>
    </div>
  );
}
