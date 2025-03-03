FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# Build Tailwind CSS
RUN npx tailwindcss -i ./src/index.css -o ./public/styles.css
EXPOSE 3000
CMD ["node", "src/server.js"]