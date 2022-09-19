import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testMatch: ['**/__tests__/**/*.tsx'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
}

export default config
