
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

// ── Validation helpers ──
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): string | null {
  if (!email.trim()) return "Email is required.";
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address.";
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return null;
}

// ── Stored users key ──
const USERS_KEY = "soso_users";
const SESSION_KEY = "soso_session";

interface StoredUser { name: string; email: string; password: string; }

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch { return []; }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): User | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch { return null; }
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getSession());

  const login = useCallback((email: string, password: string): { ok: boolean; error?: string } => {
    const emailErr = validateEmail(email);
    if (emailErr) return { ok: false, error: emailErr };
    const pwErr = validatePassword(password);
    if (pwErr) return { ok: false, error: pwErr };

    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) return { ok: false, error: "Invalid email or password." };

    const loggedIn: User = { name: found.name, email: found.email };
    setUser(loggedIn);
    localStorage.setItem(SESSION_KEY, JSON.stringify(loggedIn));
    return { ok: true };
  }, []);

  const signup = useCallback((name: string, email: string, password: string): { ok: boolean; error?: string } => {
    if (!name.trim()) return { ok: false, error: "Name is required." };
    const emailErr = validateEmail(email);
    if (emailErr) return { ok: false, error: emailErr };
    const pwErr = validatePassword(password);
    if (pwErr) return { ok: false, error: pwErr };

    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const newUser: StoredUser = { name: name.trim(), email: email.toLowerCase(), password };
    saveStoredUsers([...users, newUser]);

    const loggedIn: User = { name: newUser.name, email: newUser.email };
    setUser(loggedIn);
    localStorage.setItem(SESSION_KEY, JSON.stringify(loggedIn));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}