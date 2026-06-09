import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  AutoRefreshTokenService,
  UserActivityService,
  provideKeycloak,
  withAutoRefreshToken,
} from 'keycloak-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideKeycloak({
      config: {
        url: 'http://localhost:8080',
        realm: 'dev',
        clientId: 'front-dashboard',
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      },
      // AutoRefreshTokenService & UserActivityService harus di-provide eksplisit
      // agar withAutoRefreshToken bisa berjalan tanpa NG0201
      providers: [AutoRefreshTokenService, UserActivityService],
      features: [
        withAutoRefreshToken({
          onInactivityTimeout: 'logout',
          sessionTimeout: 60000, // 1 menit tidak ada aktivitas → auto logout
        }),
      ],
    }),
  ],
};
