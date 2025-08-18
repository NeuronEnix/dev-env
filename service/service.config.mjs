import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

function getEnvContent(filePath) {
  const env = {}
  dotenv.config({ path: filePath, processEnv: env })
  return env
}

export const appServiceEnv = {
  path: "./service/app/.env",
  env: {
    base: {
      COMPOSE_PROJECT_PREFIX: "dev",
      COMPOSE_NETWORK: "dev",
      COMPOSE_RESTART_POLICY: "unless-stopped"
    },
    image: {
      OPEN_WEBUI_IMAGE: "ghcr.io/open-webui/open-webui:main",
      FILE_TRAY_IMAGE: "flawiddsouza/file-tray:1.0.0",
      ACTUAL_IMAGE: "actualbudget/actual-server",
      I_SPY_IMAGE: "mekayelanik/ispyagentdvr:latest",
      JELLYFIN_IMAGE: "jellyfin/jellyfin",
      STIRLING_PDF_IMAGE: "frooodle/s-pdf:latest",
      MAYBE_FINANCE_IMAGE: "ghcr.io/maybe-finance/maybe:stable"
    },
    port: {
      OPEN_WEBUI_PORT: "30001",
      FILE_TRAY_PORT: "30002",
      ACTUAL_PORT: "30003",
      I_SPY_PORT: "30004",
      JELLYFIN_PORT: "30005",
      STIRLING_PDF_PORT: "30006",
      MAYBE_FINANCE_PORT: "30007"
    },
    serviceEnv: {
      OPENAI_API_KEY: "sk-abc",
      MAYBE_FINANCE_SECRET_KEY_BASE: "89df0",
      MAYBE_FINANCE_POSTGRES_HOST: "psql",
      MAYBE_FINANCE_POSTGRES_DB: "maybe",
      MAYBE_FINANCE_POSTGRES_USER: "root",
      MAYBE_FINANCE_POSTGRES_PASS: "pass123"
    }
  }
}
export const managerServiceEnv = {
  path: "./service/manager/.env",
  env: {
    base: {
      COMPOSE_PROJECT_PREFIX: "dev",
      COMPOSE_NETWORK: "dev",
      COMPOSE_RESTART_POLICY: "unless-stopped"
    },
    image: {
      NGINX_PROXY_IMAGE: "jc21/nginx-proxy-manager:latest",
      PORTAINER_IMAGE: "portainer/portainer-ce:latest",
      PORTAINER_AGENT_IMAGE: "portainer/agent:2.19.5",
      UPTIME_KUMA_IMAGE: "louislam/uptime-kuma:latest",
      SYNCTHING_IMAGE: "syncthing/syncthing",
      WATCHTOWER_IMAGE: "containrrr/watchtower"
    },
    port: {
      NGINX_PROXY_DASHBOARD_PORT: "30101",
      PORTAINER_HTTPS_PORT: "30102",
      PORTAINER_HTTP_PORT: "30103",
      PORTAINER_AGENT_PORT: "30104",
      UPTIME_KUMA_PORT: "30105",
      SYNCTHING_PORT: "30106",
      WATCHTOWER_PORT: "30107"
    }
  }
}
export const storageServiceEnv = {
  path: "./service/storage/.env",
  env: {
    base: {
      COMPOSE_PROJECT_PREFIX: "dev",
      COMPOSE_NETWORK: "dev",
      COMPOSE_RESTART_POLICY: "unless-stopped"
    },
    image: {
      REDIS_IMAGE: "redis:latest",
      REDIS_COMMANDER_IMAGE: "rediscommander/redis-commander:latest",
      MYSQL_IMAGE: "mysql:latest",
      PHP_MY_ADMIN_IMAGE: "phpmyadmin:latest",
      MONGO_DB_IMAGE: "mongo",
      MONGO_EXPRESS_IMAGE: "mongo-express",
      POSTGRES_IMAGE: "postgres:latest",
      ADMINER_IMAGE: "adminer:latest",
      PGADMIN_IMAGE: "dpage/pgadmin4",
      COUCH_DB_IMAGE: "couchdb:latest",
      CLICKHOUSE_IMAGE: "clickhouse",
      CLICKHOUSE_CLIENT_IMAGE: "clickhouse/clickhouse-client",
      HASURA_IMAGE: "hasura/graphql-engine:v2.36.1"
    },
    port: {
      REDIS_COMMANDER_PORT: "30201",
      PHP_MY_ADMIN_PORT: "30202",
      MONGO_DB_PORT: "30203",
      MONGO_EXPRESS_PORT: "30204",
      POSTGRES_PORT: "30205",
      ADMINER_PORT: "30206",
      PGADMIN_PORT: "30207",
      COUCH_DB_PORT: "30208",
      HASURA_PORT: "30209"
    },
    serviceEnv: {
      MYSQL_ROOT_PASSWORD: "pass123",
      MONGO_USERNAME: "root",
      MONGO_PASSWORD: "pass123",
      POSTGRES_USER: "root",
      POSTGRES_PASSWORD: "pass123",
      POSTGRES_DB: "test",
      COUCH_DB_USER: "root",
      COUCH_DB_PASSWORD: "pass123",
      PGADMIN_USER: "a@a.com",
      PGADMIN_PASSWORD: "pass123",
      CLICKHOUSE_USER: "root",
      CLICKHOUSE_PASSWORD: "pass123",
      CLICKHOUSE_DB: "db",
      HASURA_GRAPHQL_DATABASE_URL: "postgres://root:pass123@psql:5432/db_name",
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true",
      HASURA_GRAPHQL_ADMIN_SECRET: "pass123"
    }
  }
}

// Helper function to merge environment data
function mergeEnvData(configEnv, existingEnv) {
  const merged = {}

  // First, build a set of all known config keys (non-serviceEnv)
  const configKeys = new Set()
  for (const [category, values] of Object.entries(configEnv)) {
    if (category !== 'serviceEnv') {
      for (const key of Object.keys(values)) {
        configKeys.add(key)
      }
    }
  }

  // Process each category from config
  for (const [category, values] of Object.entries(configEnv)) {
    if (category === 'serviceEnv') {
      // Special handling for serviceEnv - preserve existing, add missing
      merged[category] = { ...values } // Start with config defaults

      if (existingEnv && Object.keys(existingEnv).length > 0) {
        // Preserve existing serviceEnv values
        for (const [key, value] of Object.entries(existingEnv)) {
          // If it's not a known config key (base/image/port), it's a serviceEnv
          if (!configKeys.has(key)) {
            // Preserve the existing value
            merged[category][key] = value
          } else if (values.hasOwnProperty(key)) {
            // If it's explicitly in serviceEnv config, preserve existing value
            merged[category][key] = value
          }
        }
      }
    } else {
      // For base, image, port - config overrides everything
      merged[category] = { ...values }
    }
  }

  return merged
}

// Helper function to generate formatted .env content
function generateEnvContent(envData) {
  let content = ''

  // Add Docker Compose Config section
  if (envData.base) {
    content += '# Docker Compose Config\n'
    for (const [key, value] of Object.entries(envData.base)) {
      content += `  ${key} = ${value}\n`
    }
    content += '\n'
  }

  // Add Image Names section
  if (envData.image) {
    content += '# Image Names\n'
    for (const [key, value] of Object.entries(envData.image)) {
      content += `  ${key} = ${value}\n`
    }
    content += '\n'
  }

  // Add Port section
  if (envData.port) {
    const portKeys = Object.keys(envData.port)
    if (portKeys.length > 0) {
      // Determine port range from first port value
      const firstPort = envData.port[portKeys[0]]
      const portPrefix = firstPort.substring(0, 3) + 'XX'
      content += `# Port ${portPrefix}\n`
      for (const [key, value] of Object.entries(envData.port)) {
        content += `  ${key} = ${value}\n`
      }
      content += '\n'
    }
  }

  // Add ENV section with service-specific values
  if (envData.serviceEnv && Object.keys(envData.serviceEnv).length > 0) {
    content += '\n# ENV\n'

    // Group related environment variables
    const envGroups = {}
    for (const [key, value] of Object.entries(envData.serviceEnv)) {
      // Determine group based on key prefix
      let group = 'General'
      if (key.includes('MYSQL')) group = 'MySQL'
      else if (key.includes('MONGO')) group = 'MongoDB'
      else if (key.includes('POSTGRES') && !key.includes('MAYBE_FINANCE')) group = 'Postgres'
      else if (key.includes('COUCH_DB')) group = 'CouchDB'
      else if (key.includes('PGADMIN')) group = 'Pgadmin'
      else if (key.includes('CLICKHOUSE')) group = 'Clickhouse'
      else if (key.includes('HASURA')) group = 'Hasura'
      else if (key.includes('MAYBE_FINANCE')) group = 'Maybe Finance'
      else if (key.includes('OPENAI')) group = 'OpenAI'

      if (!envGroups[group]) envGroups[group] = {}
      envGroups[group][key] = value
    }

    // Output grouped environment variables
    const groupOrder = ['OpenAI', 'Maybe Finance', 'MySQL', 'MongoDB', 'Postgres', 'CouchDB',
                        'Pgadmin', 'Clickhouse', 'Hasura', 'General']

    for (const group of groupOrder) {
      if (envGroups[group]) {
        if (group !== 'General' && group !== 'OpenAI') {
          content += `  # ${group}\n`
        }

        for (const [key, value] of Object.entries(envGroups[group])) {
          if (key === 'MAYBE_FINANCE_SECRET_KEY_BASE') {
            content += '\n  # generated using: openssl rand -hex 64\n'
          }
          content += `    ${key} = ${value}\n`
        }

        if (group === 'OpenAI' || (group === 'Maybe Finance' && Object.keys(envGroups).length > 2)) {
          content += '\n'
        }
      }
    }
  }

  return content
}

// Process a single service configuration
function processServiceEnv(serviceConfig) {
  const { path: envPath, env: configEnv } = serviceConfig

  // Resolve the full path
  const fullPath = path.resolve(envPath)

  let existingEnv = {}

  // Check if .env file exists and read it
  if (fs.existsSync(fullPath)) {
    try {
      existingEnv = getEnvContent(fullPath)
      console.log(`  Reading existing .env from ${envPath}`)
    } catch (error) {
      console.warn(`  Warning: Could not parse existing .env at ${envPath}: ${error.message}`)
    }
  } else {
    console.log(`  Creating new .env at ${envPath}`)
  }

  // Merge configuration with existing data
  const mergedEnv = mergeEnvData(configEnv, existingEnv)

  // Generate formatted content
  const envContent = generateEnvContent(mergedEnv)

  // Ensure directory exists
  const dir = path.dirname(fullPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // Write the .env file
  fs.writeFileSync(fullPath, envContent, 'utf8')
  console.log(`  ✓ Successfully updated ${envPath}`)
}

export function setupServiceConfig() {
  console.log('Setting up service configurations...\n')

  const services = [
    { name: 'App Service', config: appServiceEnv },
    { name: 'Manager Service', config: managerServiceEnv },
    { name: 'Storage Service', config: storageServiceEnv }
  ]

  for (const { name, config } of services) {
    console.log(`Processing ${name}:`)
    try {
      processServiceEnv(config)
    } catch (error) {
      console.error(`  ✗ Failed to process ${name}: ${error.message}`)
    }
    console.log()
  }

  console.log('Service configuration setup complete!')
}
