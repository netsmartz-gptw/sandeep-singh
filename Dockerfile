FROM node:12.22.12

WORKDIR /app

COPY . .

RUN  apt-get update && \
     apt-get install nano vim sudo -y && \
     apt-get install apache2 -y && \
     a2enmod proxy && \
     apt-get -y install openssh-server && \
     a2enmod proxy_http


RUN npm install

EXPOSE 8000  
#CMD ["node", "index.js" ]
CMD ["./start.sh" ]
