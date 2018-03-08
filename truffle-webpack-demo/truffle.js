module.exports = {
networks: {
      development: {
        host: 'testrpc',
        port: 8545,
        gas: 1900000,
        network_id: "*"
      }
     },
migrations_directory: './migrations',
}