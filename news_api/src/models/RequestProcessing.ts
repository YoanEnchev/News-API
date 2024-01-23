export default interface RequestProcessing {
    started_at: number; // Represents timestamp
    endpoint: string;
    http_method: string;
    headers: object;
    body_parameters: object;
    error_msg?: string;
    response_time_ms: number
    response_status_code: number
}
  