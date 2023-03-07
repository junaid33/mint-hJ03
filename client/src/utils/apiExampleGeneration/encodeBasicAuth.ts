export function encodeBasicAuth(
  authName: string | undefined,
  authorizationInputs: Record<string, string> | undefined
) {
  if (authorizationInputs) {
    let usernameFieldName = 'username';
    let passwordFieldName = 'password';
    if (authName) {
      [usernameFieldName, passwordFieldName] = authName.split(':');
    }

    const username = authorizationInputs[usernameFieldName];
    const password = authorizationInputs[passwordFieldName];

    if (username && password) {
      const encoded = Buffer.from(`${username}:${password}`).toString('base64');

      return `Basic ${encoded}`;
    }
  }

  return `Basic AUTH_VALUE`;
}
