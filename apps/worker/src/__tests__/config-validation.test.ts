/**
 * Tests for config validation — ensures semantic correctness beyond schema validation.
 */

import { describe, expect, it } from 'vitest';

interface ConfigAuth {
  login_type: string;
  login_url: string;
  credentials: {
    username: string;
    password: string;
    totp_secret?: string;
  };
  login_flow?: string[];
  success_condition?: string;
}

interface ConfigRules {
  avoid?: Array<{ description: string }>;
  focus?: Array<{ description: string }>;
}

// Semantic validation that goes beyond JSON Schema
function validateConfigSemantics(auth?: ConfigAuth, rules?: ConfigRules): string[] {
  const errors: string[] = [];

  if (auth) {
    if (!auth.credentials.username?.trim()) {
      errors.push('Authentication configured but username is empty');
    }
    if (!auth.credentials.password?.trim()) {
      errors.push('Authentication configured but password is empty');
    }
    if (!auth.login_url?.trim()) {
      errors.push('Authentication configured but login_url is empty');
    }
    if (!['form', 'sso', 'api', 'basic'].includes(auth.login_type)) {
      errors.push(`Invalid login_type: ${auth.login_type}`);
    }
  }

  if (rules?.avoid) {
    for (const rule of rules.avoid) {
      if (!rule.description?.trim()) {
        errors.push('Avoid rule has empty description');
      }
    }
  }

  if (rules?.focus) {
    for (const rule of rules.focus) {
      if (!rule.description?.trim()) {
        errors.push('Focus rule has empty description');
      }
    }
  }

  return errors;
}

describe('Config Semantic Validation', () => {
  it('should pass for valid config', () => {
    const auth: ConfigAuth = {
      login_type: 'form',
      login_url: 'https://example.com/login',
      credentials: { username: 'admin', password: 'password123' },
    };
    expect(validateConfigSemantics(auth)).toEqual([]);
  });

  it('should catch empty username', () => {
    const auth: ConfigAuth = {
      login_type: 'form',
      login_url: 'https://example.com/login',
      credentials: { username: '', password: 'password123' },
    };
    const errors = validateConfigSemantics(auth);
    expect(errors).toContain('Authentication configured but username is empty');
  });

  it('should catch empty password', () => {
    const auth: ConfigAuth = {
      login_type: 'form',
      login_url: 'https://example.com/login',
      credentials: { username: 'admin', password: '' },
    };
    const errors = validateConfigSemantics(auth);
    expect(errors).toContain('Authentication configured but password is empty');
  });

  it('should catch invalid login type', () => {
    const auth: ConfigAuth = {
      login_type: 'invalid',
      login_url: 'https://example.com/login',
      credentials: { username: 'admin', password: 'pass' },
    };
    const errors = validateConfigSemantics(auth);
    expect(errors).toContain('Invalid login_type: invalid');
  });

  it('should catch empty rule descriptions', () => {
    const rules: ConfigRules = {
      avoid: [{ description: '' }],
      focus: [{ description: 'Valid focus' }],
    };
    const errors = validateConfigSemantics(undefined, rules);
    expect(errors).toContain('Avoid rule has empty description');
  });

  it('should pass with no auth config', () => {
    expect(validateConfigSemantics()).toEqual([]);
  });
});
