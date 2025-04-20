import { ResourcesConfig } from '@aws-amplify/core';

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
      userPoolId: process.env.REACT_APP_USER_POOL_ID || '',
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || '',
      loginWith: {
        oauth: {
          domain: process.env.REACT_APP_COGNITO_DOMAIN || '',
          scopes: ['email', 'openid', 'profile'],
          redirectSignIn: ['http://localhost:3000',
            'https://main.d3lg2e3qgeamfr.amplifyapp.com/',
            'https://cognito.funtamentals.online'
          ],
          redirectSignOut: ['http://localhost:3000',
            'https://main.d3lg2e3qgeamfr.amplifyapp.com/',
            'https://cognito.funtamentals.online'
          ],
          responseType: 'code'
        }
      }
    }
  }
};
