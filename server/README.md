for run db:
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:latest

for check db:
docker exec -it mongodb mongo