import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: JWT_OPTIONS, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    JwtHelperService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
