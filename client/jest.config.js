export const preset = 'ts-jest';
export const roots = ['<rootDir>'];
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.ts'];
export const moduleFileExtensions = ['js', 'ts', 'tsx', 'json'];
export const collectCoverageFrom = ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'];
export const transformIgnorePatterns = ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'];
export const transform = {
  '^.+\\.(ts|tsx)$': 'ts-jest',
};
export const moduleNameMapper = {
  '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
};
