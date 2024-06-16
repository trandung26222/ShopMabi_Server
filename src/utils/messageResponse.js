export function messageResponse(status, message, data) {
  return {
    status: status,
    message: message,
    data: data,
  };
}
