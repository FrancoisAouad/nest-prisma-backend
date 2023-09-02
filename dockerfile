FROM node:alpine
WORKDIR /app
COPY package*.json  /app
COPY pnpm-lock.yaml /app
RUN npm install -g pnpm 
RUN cd /app
RUN pnpm install
# RUN prisma generate
COPY . .
RUN npx prisma generate
RUN npx prisma migrate dev
EXPOSE 5021
CMD ["pnpm", "start"]