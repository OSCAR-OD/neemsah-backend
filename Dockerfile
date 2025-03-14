ARG NODE_VERSION=20.3.1
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app
# Add package file
COPY package*.json .
# Install deps
RUN npm install
COPY . .
RUN npm run build

# Start production image build
FROM node:${NODE_VERSION}-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci --only=${NODE_ENV}

COPY --from=base /usr/src/app/dist ./dist

CMD ["npm","start"]