FROM node:18-alpine as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY tsconfig.json .
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json .
RUN npm install --production
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/server.js"]
