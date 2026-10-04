export default function LoadingState({ message = "Loading..." }) {
  return (
    <div className="state-box" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export function ErrorState({ message = "Something went wrong." }) {
  return (
    <div className="state-box state-box-error" role="alert">
      <strong>Unable to continue</strong>
      <p>{message}</p>
    </div>
  );
}
