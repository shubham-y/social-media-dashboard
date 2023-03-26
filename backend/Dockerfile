#
# BASE
#

FROM node:16.19.0 as base
RUN mkdir -p code && chown -R node:node code
WORKDIR /code
COPY --chown=node:node package*.json ./
EXPOSE 80
USER  node

#
# PRODUCTION
#

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY --chown=node:node ./ ./
CMD ["node", "server.js"]

#
# DEV
#

FROM base as dev
ENV NODE_ENV=development 
RUN npm install
COPY --chown=node:node ./ ./
CMD [ "npx","nodemon","-L", "server.js"]
