FROM node:12

COPY . .
RUN npm i 

RUN cd ./'Back End'
RUN npm i

CMD ["nodejs", "main.js"]
