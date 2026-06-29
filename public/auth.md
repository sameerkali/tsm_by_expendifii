# Auth.md

> TSM by Expendifii — Agent Authentication & Registration
> Last updated: 2026-06-29

## Overview

TSM by Expendifii uses a **JWT-based cookie authentication** system. Agents and users authenticate via a login flow that issues a signed token, stored in a secure HTTP-only cookie (`token`). A guest mode is also available for limited access without full registration.

---

## Agent Registration

### 1. User Registration (Sign-up)

New agents/users register at:

```
POST https://tsm.expendifii.com/api/proxy/auth/register
```

**Request body (JSON):**
```json
{
  "email": "agent@example.com",
  "password": "...",
  "name": "Agent Name",
  "companyName": "Company"
}
```

**Response (201 Created):**
```json
{
  "message": "Registration successful. Please check your email to activate your account.",
  "userId": "uuid"
}
```

Registration requires email verification before the account is active.

### 2. Account Activation

After registration, users receive an activation link. Activation is confirmed via:

```
POST https://tsm.expendifii.com/api/proxy/auth/activate
```

**Request body:**
```json
{
  "token": "activation-token-from-email"
}
```

### 3. Direct Registration Page

A browser-based registration form is available at:

```
https://tsm.expendifii.com/register
```

---

## Authentication Flow

### Login

```
POST https://tsm.expendifii.com/api/proxy/auth/login
```

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "..."
}
```

**Response (200 OK):**
A JWT is set as an HTTP-only cookie named `token`. The cookie name is configurable via the `COOKIE_NAME` environment variable (default: `token`).

### Guest Mode

Users can access the application without full registration via guest mode:

```
POST https://tsm.expendifii.com/api/proxy/auth/guest
```

A `tms_guest` cookie is set with value `1`, granting limited access.

### Session

Authenticated sessions are managed on the client via the `token` cookie. Token validity is enforced by the backend on every API call. Expired tokens are handled globally via a 401 interceptor.

---

## Credential Types

| Type | Description | Usage |
|------|-------------|-------|
| `jwt-cookie` | JWT stored in HTTP-only cookie | Primary auth for browser-based agents |
| `guest-token` | Session-based guest access | Limited-access exploration |
| `api-key` | Server-to-server API key | Not yet publicly available |

---

## Protected Resource Metadata Discovery

Protected API resources are discovered via the proxy endpoint:

```
https://tsm.expendifii.com/api/proxy/{resource}
```

All API requests require the `token` cookie. Unauthenticated requests return 401. The backend enforces authorization on every call.

---

## Authorization Server Metadata

The authorization server metadata can be discovered at:

```
https://tsm.expendifii.com/.well-known/oauth-authorization-server
```

*(Currently in development — OAuth 2.0 / OpenID Connect is not yet available. JWT-based cookie auth is the current mechanism.)*

---

## Claim Ceremony: Agent Verified / User Claimed

To claim a user identity as an agent:

1. **Register** at `/register` or via the API registration endpoint
2. **Activate** your account by clicking the email verification link or posting the activation token
3. **Login** to obtain a JWT cookie
4. **Verify** your identity by making an authenticated request to the user profile endpoint

The ceremony flow:

```
Register → Activate (email) → Login (JWT issued) → Authenticated session established
```

A user is considered **claimed** after successful account activation and login. The claimed identity is tied to the email address used during registration.

---

## Credential Use & Revocation

### Using Credentials

Include the `token` cookie in all authenticated requests:

```
Cookie: token=<jwt>
```

The JWT is automatically attached by the browser for same-origin requests. Server-to-server agents must manually include the cookie.

### Revocation

Credentials are revoked by:

1. **Logout:** `POST /api/proxy/auth/logout` clears the `token` cookie
2. **Token expiry:** JWTs have a configurable TTL. Expired tokens are rejected with 401
3. **Account deactivation:** Admin can deactivate accounts, invalidating all sessions
4. **Cookie deletion:** The client can delete the `token` cookie to end the session

### Error Handling

| Status | Meaning | Handling |
|--------|---------|----------|
| 401 | Unauthorized / expired token | Redirect to login or re-authenticate |
| 403 | Forbidden | User lacks permissions for the resource |
| 307 | Redirect to login | Middleware intercepts unauthenticated requests |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `COOKIE_NAME` | `token` | Name of the auth cookie |
| `NEXT_PUBLIC_API_URL` | — | Backend API base URL |

---

## References

- Next.js documentation on middleware auth patterns
- JWT.io for token debugging
- OAuth 2.0 Framework (RFC 6749) for future OAuth support
