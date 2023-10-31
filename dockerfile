FROM node:20-alpine
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
EXPOSE 3000

ENV MONGODB_CONNECTION_STRING='mongodb+srv://punitsaini548:i3DHrQcKLM1UkMn4@cluster0.x1uqacw.mongodb.net/book_management'

ENV DEBUG=true

CMD [ "node", "index.js" ]
