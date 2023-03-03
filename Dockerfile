FROM node:lts

WORKDIR /app/nestjs

EXPOSE 3000
COPY . /app/nestjs

RUN npm install --legacy-peer-deps
RUN npm run build

USER 1000

CMD ["npm", "run", "start:prod"]