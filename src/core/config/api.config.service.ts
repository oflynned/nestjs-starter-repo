import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRedisUrl, parseRedisUrl } from 'parse-redis-url-simple';

const defaultKeys = ['MODE'];

@Injectable()
export class ApiConfigService {
  constructor(private readonly configService: ConfigService) {}

  getPort(): number {
    return this.getValue<number>('PORT') ?? 3002;
  }

  getMode(): string {
    return this.getValue<string>('MODE') ?? 'development';
  }

  getAdminUsername(): string {
    return this.getValue<string>('ADMIN_USERNAME');
  }

  getAdminPassword(): string {
    return this.getValue<string>('ADMIN_PASSWORD');
  }

  getNodeEnv(): string {
    return this.getValue<string>('NODE_ENV');
  }

  isProductionMode(): boolean {
    return this.getMode() === 'production';
  }

  isProductionEnv(): boolean {
    return this.getNodeEnv() === 'production';
  }

  isStagingMode(): boolean {
    return this.getMode() === 'staging';
  }

  isProductionOrStagingMode(): boolean {
    return this.isProductionMode() || this.isStagingMode();
  }

  isProductionOrStagingOrDevelopmentMode(): boolean {
    return (
      this.isProductionMode() ||
      this.isStagingMode() ||
      this.isDevelopmentMode()
    );
  }

  isDevelopmentOrStagingMode(): boolean {
    return this.isDevelopmentMode() || this.isStagingMode();
  }

  isDevelopmentOrTest(): boolean {
    return this.isDevelopmentMode() || this.isTestEnv();
  }

  isDevelopmentMode(): boolean {
    return this.getMode() === 'development';
  }

  isTestEnv(): boolean {
    return this.getNodeEnv() === 'test';
  }

  isTestMode(): boolean {
    return this.getMode() === 'test';
  }

  getDatabaseUrl(): string {
    return this.getValue<string>('DATABASE_URL', true);
  }

  getRedisUrl(): string {
    return this.getValue<string>('REDIS_URL');
  }

  getRedisConnectionOptions(): IRedisUrl {
    const [uri] = parseRedisUrl(this.getRedisUrl());
    return {
      password: uri.password,
      host: uri.host,
      port: uri.port,
    };
  }

  getPackageVersion(): string {
    return process.env.npm_package_version;
  }

  protected getValue<T>(key: string, throwOnMissing = false): T | null {
    const value = this.configService.get<T>(key);

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value ?? null;
  }

  protected ensureValues(keys: string[]): ApiConfigService {
    [...keys, ...defaultKeys].forEach((key) => this.getValue<unknown>(key));

    return this;
  }
}
