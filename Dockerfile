FROM node

WORKDIR /usr/app

COPY . .

RUN npm install 


ENTRYPOINT [ "node", "index.js" ]
