FROM node:lts-alpine AS deps

WORKDIR /pomodoro
COPY package.json .
COPY yarn.lock .

RUN yarn

FROM deps AS build

WORKDIR /pomodoro 
COPY . .
RUN yarn build

FROM nginx:latest AS webserver
COPY --from=build /pomodoro/dist /usr/share/nginx/html