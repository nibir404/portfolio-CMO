type LogContext = Record<string, string | number | boolean | undefined>;

export function describeError(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  if (typeof error === "string") return error;
  return String(error);
}

export function reportError(scope: string, error: unknown, context?: LogContext): void {
  if (context) {
    console.error(`[${scope}] ${describeError(error)}`, context);
    return;
  }
  console.error(`[${scope}] ${describeError(error)}`);
}

export function reportWarning(scope: string, message: string, context?: LogContext): void {
  if (context) {
    console.warn(`[${scope}] ${message}`, context);
    return;
  }
  console.warn(`[${scope}] ${message}`);
}
