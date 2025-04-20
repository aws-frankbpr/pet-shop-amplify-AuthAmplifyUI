import { ResourcesConfig } from 'aws-amplify';

const requireEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const authConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: requireEnvVar('REACT_APP_USER_POOL_ID'),
      userPoolClientId: requireEnvVar('REACT_APP_USER_POOL_CLIENT_ID'),
      loginWith: {
        oauth: {
          domain: requireEnvVar ('REACT_APP_COGNITO_DOMAIN'),
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: ['http://localhost:3000',
            'https://main.dr4ixyv9p77ql.amplifyapp.com/',
             'https://cognito.funtamentals.online'
          ],
          redirectSignOut: ['http://localhost:3000',
            'https://main.dr4ixyv9p77ql.amplifyapp.com/',
            'https://cognito.funtamentals.online'
          ],
          responseType: 'code'
        }
      }
    }
  }
};
