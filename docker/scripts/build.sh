#! /bin/bash

cd `dirname $0`
pwd=`pwd`
cd -

buildDir=${pwd}/../build

composeFile=${pwd}/../build.yml
basePath=/data/website

mkdir -p ${buildDir}

# docker-compose -f ${composeFile} build web
# docker save -o ${buildDir}/01factory-web.tar 01factory.io/web:latest
# scp -P 54088 ${buildDir}/01factory-web.tar root@0.0.0.0:${basePath}

# docker-compose -f ${composeFile} build db
# docker save -o ${buildDir}/01factory-db.tar 01factory.io/db:latest
# scp -P 54088 ${buildDir}/01factory-db.tar root@0.0.0.0:${basePath}

# docker-compose -f ${composeFile} build nginx
# docker save -o ${buildDir}/01factory-nginx.tar 01factory.io/nginx:latest
# scp -P 54088 ${buildDir}/01factory-nginx.tar root@0.0.0.0:${basePath}

scp -P 54088 ${pwd}/../deploy.yml root@0.0.0.0:${basePath}/docker-compose.yml
