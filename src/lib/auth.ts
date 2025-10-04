import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import database from './database-simple';
import type { User } from './database-simple';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'lamenagere-secret-key-change-in-production'
);

export interface SessionUser {
  id: number;
  clientId: string;
  name: string;
  role: 'admin' | 'client';
  [key: string]: any;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signJWT(payload: SessionUser): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as SessionUser;
  } catch {
    return null;
  }
}

export async function authenticateUser(clientId: string, password: string): Promise<SessionUser | null> {
  try {
    const user = await database.getUserByClientId(clientId);
    
    if (!user || !user.active) {
      return null;
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      clientId: user.clientId,
      name: user.name,
      role: user.role
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function createUser(
  clientId: string,
  name: string,
  password: string,
  role: 'admin' | 'client' = 'client'
): Promise<number> {
  const hashedPassword = await hashPassword(password);
  
  return database.createUser({
    clientId,
    name,
    password: hashedPassword,
    role,
    active: true
  });
}