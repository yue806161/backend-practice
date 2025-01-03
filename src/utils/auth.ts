import { IncomingHttpHeaders } from 'node:http2';

/**
 * Extracts a Bearer token from the HTTP headers.
 * @param headers - The HTTP request headers.
 * @returns The extracted token, or null if no valid token is found.
 */
export function extractBearerToken(headers: IncomingHttpHeaders): string | null {
  const authorizationHeader = headers['authorization'] || headers['Authorization'];

  if (!authorizationHeader || typeof authorizationHeader !== 'string') {
    return null;
  }

  const bearerTokenMatch = authorizationHeader.match(/^Bearer\s+(.+)$/i);

  return bearerTokenMatch ? bearerTokenMatch[1] : null;
}
