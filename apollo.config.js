module.exports = {
  client: {
    service: {
      name: 'projectName',
      url: 'https://staging.aws..com/graphql',
    },
    includes: ['./src/graphql/**/*.ts'],
    excludes: ['**/__tests__/**', './src/graphql/Local/*.ts'],
  },
}
