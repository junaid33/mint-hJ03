import { encodeBasicAuth } from '@/utils/apiExampleGeneration/encodeBasicAuth';

describe('encodeBasicAuth', () => {
  test('finds default basic authentication inputs then encodes them', () => {
    expect(
      encodeBasicAuth('', {
        username: 'username-value',
        password: 'password-value',
        other: 'other-value',
      })
    ).toEqual('Basic dXNlcm5hbWUtdmFsdWU6cGFzc3dvcmQtdmFsdWU=');
  });

  test('finds custom basic authentication inputs then encodes them', () => {
    expect(
      encodeBasicAuth('user-id:api-key', {
        'user-id': 'user-id-value',
        'api-key': 'api-key-value',
        username: 'username-value',
        password: 'password-value',
        other: 'other-value',
      })
    ).toEqual('Basic dXNlci1pZC12YWx1ZTphcGkta2V5LXZhbHVl');
  });

  test('returns placeholder when a value is not set', () => {
    expect(
      encodeBasicAuth('user-id:api-key', {
        'user-id': 'user-id-value',
        'api-key': '',
        username: 'username-value',
        password: 'password-value',
        other: 'other-value',
      })
    ).toEqual('Basic AUTH_VALUE');
  });
});
