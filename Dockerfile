FROM node:20-alpine
WORKDIR /app
COPY package* .

RUN npm i
RUN npm i @esbuild/linux-arm64
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "preview" ]