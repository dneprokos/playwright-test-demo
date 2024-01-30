# Build the Docker images without using the cache
docker-compose -f herokuapp-docker-compose.yml build --no-cache

# Start the services as defined in the Docker Compose file
docker-compose -f herokuapp-docker-compose.yml up