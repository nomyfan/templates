export class ServerError extends Error {
  code: number;
  context: unknown;
  constructor(props: {
    code: number;
    message: string;
    cause?: unknown;
    context?: unknown;
  }) {
    super(props.message, { cause: props.cause });
    this.code = props.code;
    this.context = props.context;
  }
}
