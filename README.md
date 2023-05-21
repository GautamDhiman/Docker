# Docker
Develop apps using Docker

## Commands

- create image
```
docker build -t <image-name> <path_to_DOCKERFILE>

docker build -t node-app-image .
```

- create container
```
docker run -p <host-port>:<container-port> -d --name <container-name> <image-name>

docker run -p 80:80 -d --name node-app node-app-image
```

- list containers
```
docker ps
```

- list images
```
docker images
```

- go into container
```
docker exec -it <container-name> bash

docker exec -it node-app bash
```

- add volume
```
docker run -p <host-port>:<container-port> -d --name <container-name> -v <host-path>:<container-path> <image-name>

docker run -v $(pwd):/app -p 80:80 -d --name node-app node-app-image

## for read-only bind mount i.e. host can write to container but not vice-versa

docker run -v $(pwd):/app:ro -p 80:80 -d --name node-app node-app-image

```


- docker-compose
```
docker-compose up -d

docker-compose down
```

- seprate out docker-compose for dev and prod
```
docker-compose -f <common_docker.yaml> -f <specific docker.yaml> up -d

eg: docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d 
## docker-compose.dev.yaml will override docker-compose.yaml with mentioned changes

```
