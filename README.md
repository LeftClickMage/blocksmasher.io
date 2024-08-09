# blocksmasher.io


**run node.js for coding:** 

-node C:\Users\ethan\Downloads\index.js

**run forever npm:**

-sudo npm install forever -g 

-cd [Path To Project]

-sudo npm install forever-monitor

-forever start index.js

**run node.js with local tunnel:**

-npm install -g localtunnel

-nohup npx localtunnel --port 3000 --subdomain smasher

**run ngrok forever:**

-nohup ngrok http 3000 --log=stdout > ngrok.log &

**Putting code on GITHUB:**

-cd blocksmasher.io

-git commit -am Updated Code

-git push 

-Username: LeftClickMage

-Password: --

**Taking code from GITHUB and putting it on LightSail:**

-ssh -i LightsailDefaultKey.pem bitnami@52.54.56.234

-cd /opt/bitnami/apache2/htdocs/blocksmasher.io

-git pull

-Username: LeftClickMage

-Password: --


