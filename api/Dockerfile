FROM node:18

WORKDIR /api
COPY . .

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
RUN pnpm install --frozen-lockfile --prod

CMD ["node", "server.js"]

EXPOSE 4000
