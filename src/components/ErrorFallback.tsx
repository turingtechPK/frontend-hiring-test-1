/**
 * `ErrorFallback` displays an error message and a reload button
 * when an error occurs.
 * @param error - The error object that contains the error message.
 * @returns a JSX element that displays the error message and a reload button.
 */
export function ErrorFallback({ error }: { error?: Error }) {
  return (
    <div role="alert" style={{ padding: '15px' }}>
      <p>Something went wrong:</p>
      {error && <pre>{error.message}</pre>}
      <button style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  );
}
