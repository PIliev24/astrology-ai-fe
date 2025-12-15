export interface ActionResponse<T = void> {
  success: boolean;
  error?: string;
  status?: number;
  data?: T;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

