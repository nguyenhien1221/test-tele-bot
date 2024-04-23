FROM node:lts-alpine as build

WORKDIR /app

COPY package.json .
RUN yarn

COPY . .
RUN yarn build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]