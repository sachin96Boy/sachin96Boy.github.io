import { TbAlertTriangle, TbRefresh } from "react-icons/tb";

/** Inline error with a retry action, used instead of an endless spinner. */
function LoadError({ what = "this content", onRetry }) {
  return (
    <div role="alert" className="card flex flex-col items-center gap-3 text-center">
      <TbAlertTriangle aria-hidden="true" className="h-7 w-7 text-amber-300" />
      <p className="text-fg">Couldn&apos;t load {what}.</p>
      <p className="text-sm text-muted">Check your connection and try again.</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-secondary">
          <TbRefresh aria-hidden="true" className="h-5 w-5" />
          Retry
        </button>
      )}
    </div>
  );
}

export default LoadError;
