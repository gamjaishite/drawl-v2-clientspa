FROM node:20-alpine
WORKDIR /app
COPY package* .
RUN npm i
COPY . .
EXPOSE 3000
RUN npm run build
CMD [ "npm", "run", "preview" ]