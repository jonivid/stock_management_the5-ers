import { makeAutoObservable } from "mobx";
import { useLocalObservable } from "mobx-react-lite";

export interface User {
  email: string;
}

const SESSION_KEY = "the5ers-auth";

function loadAuthFromSession(): { token: string | null; user: User | null } {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return { token: null, user: null };
    const parsed = JSON.parse(raw);
    return {
      token: typeof parsed.token === "string" ? parsed.token : null,
      user:
        parsed.user && typeof parsed.user.email === "string"
          ? parsed.user
          : null,
    };
  } catch {
    return { token: null, user: null };
  }
}

function saveAuthToSession(token: string | null, user: User | null) {
  if (token && user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, user }));
  } else {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

class AuthStore {
  isLoggedIn = false;
  user: User | null = null;
  token: string | null = null;

  constructor() {
    const { token, user } = loadAuthFromSession();
    this.token = token;
    this.user = user;
    this.isLoggedIn = !!token && !!user;
    makeAutoObservable(this);
  }

  login(email: string, token: string) {
    this.isLoggedIn = true;
    this.user = { email };
    this.token = token;
    saveAuthToSession(token, this.user);
  }

  logout() {
    this.isLoggedIn = false;
    this.user = null;
    this.token = null;
    saveAuthToSession(null, null);
  }
}

export function useAuth() {
  return useLocalObservable(() => new AuthStore());
}
