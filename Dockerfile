FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:20-alpine

COPY ./backend /backend

COPY --from=build /app/dist /backend/public
COPY --from=build /app/types /types

WORKDIR /backend

RUN npm install 

RUN npm run build

EXPOSE 3000

# Start the application
CMD ["node", "./dist/index.js"]