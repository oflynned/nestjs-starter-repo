export class RawConfigService {
  private env: Record<string, string | null>;

  static getInstance(
    env: Record<string, string | null> = process.env,
  ): RawConfigService {
    return new RawConfigService().withEnvironment(env);
  }

  withEnvironment(env: Record<string, string | null> = {}): RawConfigService {
    this.env = env;

    return this;
  }

  // TODO can we infer non-optional if throwOnMissing is true?
  getValue(key: string, throwOnMissing = true): string | null {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  ensureValues(keys: string[]): RawConfigService {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  isProduction(): boolean {
    return this.getValue('MODE', false) === 'production';
  }

  isStaging(): boolean {
    return this.getValue('MODE', false) === 'staging';
  }

  isDevelopment(): boolean {
    return this.getValue('MODE', false) === 'development';
  }

  isProductionOrStaging(): boolean {
    return this.isProduction() || this.isStaging();
  }

  isProductionOrStagingOrDevelopment(): boolean {
    return this.isProduction() || this.isStaging() || this.isDevelopment();
  }

  isTest(): boolean {
    return this.getValue('NODE_ENV', false) === 'test';
  }

  getPort(): number {
    return parseInt(this.getValue('PORT', false), 10) || 3002;
  }

  getDatabaseUrl(): string {
    return this.getValue('DATABASE_URL', true);
  }

  getRedisUrl(): string {
    return this.getValue('REDIS_URL', true);
  }
}
