import { Injectable, Inject, Signal, effect } from '@angular/core';
import Keycloak from 'keycloak-js';
import {
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEvent,
  KeycloakEventType,
} from 'keycloak-angular';
import { KeycloakTokenParsed, UserProfileInfo } from '../models/keycloak-token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loadedProfile: UserProfileInfo | null = null;

  constructor(
    private readonly keycloak: Keycloak,
    @Inject(KEYCLOAK_EVENT_SIGNAL)
    private readonly keycloakEventSignal: Signal<KeycloakEvent>,
  ) {
    void this.initAuthState();
    this.listenToKeycloakEvents();
  }

  private async initAuthState(): Promise<void> {
    if (this.keycloak.authenticated) {
      await this.loadProfileIfNeeded();
    }
  }

  private async loadProfileIfNeeded(): Promise<void> {
    const token = this.keycloak.tokenParsed as KeycloakTokenParsed | undefined;
    const name = token?.name || token?.preferred_username || 
                 (token?.given_name && token?.family_name ? `${token.given_name} ${token.family_name}` : '');
    const email = token?.email;

    if (!name || !email) {
      try {
        const profile = await this.keycloak.loadUserProfile();
        this.loadedProfile = {
          name: profile.firstName && profile.lastName
            ? `${profile.firstName} ${profile.lastName}`
            : (profile.username ?? ''),
          email: profile.email ?? '',
        };
      } catch (error) {
        console.error('AuthService: Failed to load user profile fallback', error);
      }
    }
  }

  username(): string {
    const token = this.keycloak.tokenParsed as KeycloakTokenParsed | undefined;
    const name = token?.name || token?.preferred_username || 
                 (token?.given_name && token?.family_name ? `${token.given_name} ${token.family_name}` : '');
    return name || this.loadedProfile?.name || '';
  }

  userEmail(): string {
    const token = this.keycloak.tokenParsed as KeycloakTokenParsed | undefined;
    return token?.email || this.loadedProfile?.email || '';
  }

  userInitials(): string {
    const name = this.username();
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  private listenToKeycloakEvents(): void {
    effect(() => {
      const event = this.keycloakEventSignal();

      switch (event.type) {
        case KeycloakEventType.AuthSuccess:
          void this.loadProfileIfNeeded();
          break;

        case KeycloakEventType.AuthLogout:
          this.loadedProfile = null;
          void this.logout();
          break;

        case KeycloakEventType.TokenExpired:
          console.error('AuthService: Token expired — logging out');
          void this.logout();
          break;

        case KeycloakEventType.AuthRefreshError:
          console.error('AuthService: Token refresh failed — logging out');
          void this.logout();
          break;
      }
    });
  }

  async logout(): Promise<void> {
    await this.keycloak.logout({ redirectUri: window.location.origin });
  }
}
