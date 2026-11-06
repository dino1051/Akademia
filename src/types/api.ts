export interface RespuestaApi<T> {
  message?: string;
  success: boolean;
  data: T;
}
