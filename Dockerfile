FROM node:18
WORKDIR /app

# Create project sub directories and copy files
RUN mkdir -p /app/home-page
COPY home-page /app/home-page

RUN mkdir -p /app/learn-vietnamese
COPY learn-vietnamese /app/learn-vietnamese

RUN mkdir -p /app/tractor-pulling
COPY tractor-pulling /app/tractor-pulling

RUN mkdir -p /app/vehicle-ownership-cost
COPY vehicle-ownership-cost /app/vehicle-ownership-cost

# npm install and build on each project
WORKDIR /app/home-page
RUN npm install

WORKDIR /app/learn-vietnamese
RUN npm install
RUN npm run build

WORKDIR /app/tractor-pulling
RUN npm install
RUN npm run build

WORKDIR /app/vehicle-ownership-cost
RUN npm install
RUN npm run build

# Start up node server
WORKDIR /app
EXPOSE 8080
CMD ["node", "home-page/backend/server.js"]
