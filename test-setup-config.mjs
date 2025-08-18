import { setupServiceConfig } from './service/service.config.mjs'

console.log('Testing setupServiceConfig function...\n')
console.log('='.repeat(50))

// Run the setup
setupServiceConfig()

console.log('\n' + '='.repeat(50))
console.log('Test complete! Check the .env files in:')
console.log('  - service/app/.env')
console.log('  - service/manager/.env')
console.log('  - service/storage/.env')
