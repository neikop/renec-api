# syntax=docker/dockerfile:1.4

FROM node:16.20-alpine as builder

# Create work directory
WORKDIR /app

#
COPY package.json /app
COPY package-lock.json /app

# Same as npm install
RUN npm ci

FROM node:16.20-alpine

# Create work directory
WORKDIR /app

# Copy app source to work directory
COPY --from=builder /app/ /app/
COPY . /app

ENV MONGODB_SERVICE=mongodb
ENV REDIS_SERVICE=redis

# Build and run the app
RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main" ]
