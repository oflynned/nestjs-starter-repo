import { ConfigService } from '@nestjs/config';
import { mock } from 'jest-mock-extended';
import { ApiConfigService } from './api.config.service';

const mockConfig = mock<ConfigService>();
const configService = new ApiConfigService(mockConfig);

describe(ApiConfigService.name, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getPort', () => {
    it('should default to value when missing', () => {
      mockConfig.get.mockImplementation(() => null);

      expect(configService.getPort()).toEqual(3002);
    });

    it('should return value', () => {
      mockConfig.get.mockImplementation(() => 3003);

      expect(configService.getPort()).toEqual(3003);
    });
  });

  describe('getMode', () => {
    it('should default to development', () => {
      mockConfig.get.mockImplementation(() => null);

      expect(configService.getMode()).toEqual('development');
    });

    it('should return mode', () => {
      mockConfig.get.mockImplementation(() => 'development');

      expect(configService.getMode()).toEqual('development');
    });
  });

  describe('isProduction', () => {
    it('should be truthy', () => {
      mockConfig.get.mockImplementation(() => 'production');

      expect(configService.isProductionMode()).toBeTruthy();
    });

    it('should be falsy', () => {
      mockConfig.get.mockImplementation(() => 'development');

      expect(configService.isProductionMode()).toBeFalsy();
    });
  });

  describe('isDevelopment', () => {
    it('should be truthy', () => {
      mockConfig.get.mockImplementation(() => 'development');

      expect(configService.isDevelopmentMode()).toBeTruthy();
    });

    it('should be falsy', () => {
      mockConfig.get.mockImplementation(() => 'production');

      expect(configService.isDevelopmentMode()).toBeFalsy();
    });
  });

  describe('isStaging', () => {
    it('should be truthy', () => {
      mockConfig.get.mockImplementation(() => 'staging');

      expect(configService.isStagingMode()).toBeTruthy();
    });

    it('should be falsy', () => {
      mockConfig.get.mockImplementation(() => 'production');

      expect(configService.isStagingMode()).toBeFalsy();
    });
  });

  describe('isTestEnv', () => {
    it('should be truthy', () => {
      mockConfig.get.mockImplementation(() => 'test');

      expect(configService.isTestEnv()).toBeTruthy();
    });

    it('should be falsy', () => {
      mockConfig.get.mockImplementation(() => 'production');

      expect(configService.isTestEnv()).toBeFalsy();
    });
  });

  describe('getDatabaseUrl', () => {
    it('should throw when missing', () => {
      mockConfig.get.mockImplementation(() => null);

      expect(() => configService.getDatabaseUrl()).toThrow();
    });

    it('should return value when missing', () => {
      mockConfig.get.mockImplementation(() => 'url');

      expect(configService.getDatabaseUrl()).toEqual('url');
    });
  });
});
