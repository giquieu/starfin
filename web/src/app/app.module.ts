/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpResponse } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import {
  NB_AUTH_TOKEN_WRAPPER_TOKEN,  
  NbAuthJWTToken,
  NbAuthModule,  
  NbEmailPassAuthProvider, 
  NbAuthJWTInterceptor
} from '@nebular/auth';

import { AuthGuard } from './auth-guard.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    CoreModule.forRoot(),    
    NgbModule.forRoot(),
    ThemeModule.forRoot(),   
    AppRoutingModule,
    NbAuthModule.forRoot({
      forms: {
        login: {
          redirectDelay: 3000,
        },
      },      
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            baseEndpoint: 'http://localhost:1337',
            login: {
              alwaysFail: false,
              rememberMe: true,
              endpoint: '/auth/login',
              method: 'post',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Login/Email combination is not correct, please try again.'],
              defaultMessages: ['You have been successfully logged in.'],
            },
            register: {
              alwaysFail: false,
              rememberMe: true,
              endpoint: '/auth/register',
              method: 'post',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['You have been successfully registered.'],
            },
            logout: {
              alwaysFail: false,
              endpoint: '/auth/logout',
              method: 'delete',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['You have been successfully logged out.'],
            },
            requestPass: {
              endpoint: '/auth/request-pass',
              method: 'post',
              redirect: {
                success: '/',
                failure: null,
              },
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['Reset password instructions have been sent to your email.'],
            },
            resetPass: {
              endpoint: '/auth/reset-pass',
              method: 'put',
              redirect: {
                success: '/',
                failure: null,
              },
              resetPasswordTokenKey: 'reset_password_token',
              defaultErrors: ['Something went wrong, please try again.'],
              defaultMessages: ['Your password has been successfully changed.'],
            }
           }
        }
      }
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    { provide: NB_AUTH_TOKEN_WRAPPER_TOKEN, useClass: NbAuthJWTToken },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },    
    { provide: APP_BASE_HREF, useValue: '/' },

  ],
})
export class AppModule {
}
