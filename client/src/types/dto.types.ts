export interface BaseResponseDTO<T = Record<string, unknown>> {
  status: string;
  message: string;
  data: T;
}