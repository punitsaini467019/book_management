# REST API example application

This is a bare-bones example of a api application providing a REST
API to manage a book store.

The entire application is contained within the `index.js` file.


## Install

    npm install

## Run the app

    node index.js

# REST API

The REST API for this sample app is described below.

## Get list of books

### Request

`GET /getallbook/`

    curl -i -H 'Accept: application/json' http://localhost:3000/getallbook/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Create a new Book

### Request

`POST /addbook/`

    curl -i -H 'Accept: application/json' http://localhost:3000/addbook -d {"title":"english", "author":"sumit", "summary":"english books here" }

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

{ "status": 200, "message": "Add Book successfully", "data": { "title": "english", "author": "sumit", "summary": "english books here", "_id": "6540d5a78222a814592453d0", "createdAt": "2023-10-31T10:23:35.037Z", "updatedAt": "2023-10-31T10:23:35.037Z" }}

## Get a specific Book

### Request

`GET /getonebook`

    curl -i -H 'Accept: application/json' http://localhost:3000/getonebook -d id=6540d5a78222a814592453d0

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36


{ "status": 200, "message": "Book Data Fatch Successfully", "data": { "title": "english", "author": "sumit", "summary": "english books here", "_id": "6540d5a78222a814592453d0", "createdAt": "2023-10-31T10:23:35.037Z", "updatedAt": "2023-10-31T10:23:35.037Z" }}


## Update a book

### Request

`PUT /updatebook`

    curl -i -H 'Accept: application/json' -X PUT http://localhost:3000/updatebook -d id=6540a64d8222a814592453cd -d title=updated_title

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

{ "status": 200, "message": "Book updated Successfully", "data": { "title": "updated_title", "author": "sumit", "summary": "english books here", "_id": "6540d5a78222a814592453d0", "createdAt": "2023-10-31T10:23:35.037Z", "updatedAt": "2023-10-31T10:23:35.037Z" }}

## Delete a Book

### Request

`DELETE /deletebook`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:7000/deletebook -d id=6540a64d8222a814592453cd 

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Feb 2011 12:36:32 GMT
    Status: 204 No Content
    Connection: close

{ "status": 200, "message": "Book deleted Successfully", "data": { "title": "updated_title", "author": "sumit", "summary": "english books here", "_id": "6540d5a78222a814592453d0", "createdAt": "2023-10-31T10:23:35.037Z", "updatedAt": "2023-10-31T10:23:35.037Z" }}






# Deployment of this sample api on linux vps

> Steps to deploy a this app to linux based VPS using PM2, NGINX as a reverse proxy and an SSL from LetsEncrypt


## 1. Log in to vps via ssh
 I will be using the root user, but would suggest creating a new user

## 2. Install Node/NPM
```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt install nodejs

node --version
```

## 3. Clone project from Github/gitlab
There are a few ways to get your files on to the server, I would suggest using Git
```
git clone projecturl.git
```

### 4. Install dependencies and test app
```
cd project
npm install
npm start
# stop app
ctrl+C
```
## 5. Setup PM2 process manager to keep the app running
```
sudo npm i pm2 -g
pm2 start index

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot
pm2 startup ubuntu
```
### You should now be able to access this app using the server IP and port. Now we want to setup a firewall blocking that port and setup NGINX as a reverse proxy so we can access it directly using port 80 (http)

## 6. Setup ufw firewall
```
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

## 8. Install NGINX and configure
```
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default
```
Add the following to the location part of the server block
```
    server_name domain.com www.domain.com;

    location / {
        proxy_pass http://localhost:3000; #whatever port our app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
```
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo service nginx restart
```

### You should now be able to visit the server IP with no port (port 80) and see our app. Now let's add a domain

## 9. Add domain in vps
go to domain provider panel(hostinger/godaddy/digital ocean/Namecheap), go to networking and add a domain

Add an A record for @ and for www to linux server/VPS

## Register and/or setup domain from registrar
I prefer Namecheap for domains.

Choose "Custom nameservers" and add these 3

* ns1.digitalocean.com
* ns2.digitalocean.com
* ns3.digitalocean.com

It may take a bit to propogate

10. Add SSL with LetsEncrypt
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d domain.com -d www.domain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

Now visit https://domain.com and you should see our Node app

## youtube video url
https://youtu.be/4lk27VwbQR4?si=HNXHu5EMq2oIPpRU
