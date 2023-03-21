FROM ubuntu:focal

RUN apt-get update

RUN DEBIAN_FRONTEND=noninteractive apt-get -y  install curl git sed
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install iputils-ping
RUN DEBIAN_FRONTEND=noninteractive apt-get -y  install apache2

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -

RUN DEBIAN_FRONTEND=noninteractive apt-get -y  install nodejs
WORKDIR /

RUN git clone -b main https://github.com/ManRod10/sds-ui

WORKDIR /sds-ui

RUN npm install

#
RUN REACT_APP_API_URL=/sds_api npm run build

RUN cp -fr build/* /var/www/html/

#this is possible in azure
RUN DEBIAN_FRONTEND=noninteractive  apt-get install -y openssh-server
RUN echo 'root:Docker!' | chpasswd
COPY sshd_config /etc/ssh/sshd_config
RUN apt-get clean


RUN service apache2 start

RUN a2enmod proxy
RUN a2enmod proxy_http
RUN a2enmod proxy_balancer
RUN a2enmod lbmethod_byrequests
RUN a2enmod ssl
RUN a2enmod rewrite


WORKDIR /

RUN rm -rf /sds-ui
#esto se tiene que cambiar para poder puerto de salida como parametro
#de momento dejo la variable de ambien en 3000 para que funcione.
EXPOSE 443
EXPOSE 80
EXPOSE 22

COPY 000-default.conf /etc/apache2/sites-enabled/000-default.conf
COPY sshd_config /etc/ssh/sshd_config
COPY check_backend /check_backend
COPY start.sh /start.sh
CMD ./start.sh