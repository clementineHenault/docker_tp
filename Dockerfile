FROM node:lts-trixie-slim AS builder
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Production stage
FROM node:lts-trixie-slim
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/index.js .
COPY --from=builder /app/.env .

EXPOSE 8080
CMD [ "node", "index.js" ]