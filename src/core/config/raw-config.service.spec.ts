import { RawConfigService } from './raw-config.service';

describe(RawConfigService.name, () => {
  describe('ensureValues', () => {
    it('should throw on missing value', () => {
      const env = { key: 'value' };
      const config = RawConfigService.getInstance(env);
      expect(() => config.ensureValues(['otherKey'])).toThrow();
    });

    it('should not throw when key exists', () => {
      const env = { key: 'value' };
      const config = RawConfigService.getInstance(env);
      expect(config.ensureValues(['key'])).toBeDefined();
    });

    it('should not throw when key is not required', () => {
      const env = { key: 'value' };
      const config = RawConfigService.getInstance(env);
      expect(config.ensureValues([])).toBeDefined();
    });
  });

  describe('getPort', () => {
    it('should default to 3002', () => {
      const env = {};
      const config = RawConfigService.getInstance(env);
      expect(config.getPort()).toEqual(3002);
    });

    it('should use port value from process.env', () => {
      const env = { PORT: '3003' };
      const config = RawConfigService.getInstance(env);
      expect(config.getPort()).toEqual(3003);
    });
  });

  describe('getDatabaseUrl', () => {
    it('should throw on missing', () => {
      const env = {};
      const config = RawConfigService.getInstance(env);
      expect(() => config.getDatabaseUrl()).toThrow();
    });

    it('should validate', () => {
      const env = { DATABASE_URL: 'url' };
      const config = RawConfigService.getInstance(env);
      expect(config.getDatabaseUrl()).toEqual('url');
    });
  });

  describe('isProduction', () => {
    it('should return true', () => {
      const env = { MODE: 'production' };
      const config = RawConfigService.getInstance(env);
      expect(config.isProduction()).toBeTruthy();
    });

    it('should return false', () => {
      const env = { MODE: 'staging' };
      const config = RawConfigService.getInstance(env);
      expect(config.isProduction()).toBeFalsy();
    });
  });

  describe('isProductionOrStaging', () => {
    it('should return true on production', () => {
      const env = { MODE: 'production' };
      const config = RawConfigService.getInstance(env);
      expect(config.isProductionOrStaging()).toBeTruthy();
    });

    it('should return true on staging', () => {
      const env = { MODE: 'staging' };
      const config = RawConfigService.getInstance(env);
      expect(config.isProductionOrStaging()).toBeTruthy();
    });

    it('should return false otherwise', () => {
      const env = { MODE: 'development' };
      const config = RawConfigService.getInstance(env);
      expect(config.isProductionOrStaging()).toBeFalsy();
    });
  });

  describe('isDevelopment', () => {
    it('should return true on mode being development', () => {
      const env = { MODE: 'development' };
      const config = RawConfigService.getInstance(env);
      expect(config.isDevelopment()).toBeTruthy();
    });

    it('should return false otherwise', () => {
      const env = { MODE: 'production' };
      const config = RawConfigService.getInstance(env);
      expect(config.isDevelopment()).toBeFalsy();
    });
  });

  describe('isTestEnv', () => {
    it('should return true on NODE_ENV being test', () => {
      const env = { NODE_ENV: 'test' };
      const config = RawConfigService.getInstance(env);
      expect(config.isTest()).toBeTruthy();
    });

    it('should return false otherwise', () => {
      const env = { NODE_ENV: 'development' };
      const config = RawConfigService.getInstance(env);
      expect(config.isTest()).toBeFalsy();
    });
  });
});
