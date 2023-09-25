import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
};

export default config;
