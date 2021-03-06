FROM node:16.13.2-alpine AS node

WORKDIR /app

COPY package*.json ./
COPY src ./src/
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY babel.config.js ./
COPY public ./public/
COPY nginx.conf ./
COPY .eslintrc.js ./

RUN npm install
RUN npm run build --mode=production

FROM nginx:stable-alpine AS production-stage

COPY --from=node /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist /usr/share/nginx/html

RUN ls /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]