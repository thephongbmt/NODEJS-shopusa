#GET image node from docker hub
FROM node
#Create folder in docker
RUN mkdir  /docker-skeleton
#Move in docker-skeleton
WORKDIR /docker-skeleton
#Copy 2file from real-folder to docker folder
#Optimize
#Docker have build cache show when 2 files below change it will be run yarn install
COPY package*.json ./
COPY yarn*.* ./
#Run yarn install 
RUN yarn install
#Copy source from real-folder to docker folder
COPY . .
#CMD will run when we start docker container
CMD [ "yarn","start" ]

# Docker view all images
#   docker images
# Docker view all contain
#   docker ps (-a: for all status contain `start` and `stop`)
# Docker remove cotainer
#   docker rm ${image-name} | ${image-id}
#DOCKER_BUILD
# docker build -t '${image_name}' .
 
#START IMAGE DOCKER
# EX: docker run --name='skeleton' -p 3001:3002 --env NODE_ENV='production' docker-skeleton
#  docker run --name='${name_container}' ${docker_image_name} -d -p ${communicate_port}: ${port_docker} --env <key> =<value>
#   -d: 
#   -p port communicate : port docker 
#       Ex -p 3001:3002
#   --env: NODE_ENV='development'

