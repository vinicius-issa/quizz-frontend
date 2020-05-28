# App Quizz
## App developed for the iClinic Technical Challenge

### Installation
For the installation of the Quizz App, it is necessary to have the packages: Git, NPM and Node (v12.16.1). If you are using Linux/Ubuntu, do:

```
sudo apt-get update
sudo apt-get install git 
sudo apt-get install nodejs
sudo apt-get install npm
```

Download the souce code from git:
```
git clone https://github.com/vinicius-issa/quizz-frontend.git
cd quizz-frontend
```

Now, create a  ```.env``` file in root with server address:

```
REACT_APP_SERVER_ADDRESS=<YOUR_BACKEND_ADDRESS>
REACT_APP_SERVER_TOKEN=userId
```

If you don't have our server running, you can download it [here](https://github.com/vinicius-issa/quizz_backend)

Fine, let's go install the dependeces and run the app:
```
npm install
npm start
```

That's all, folks. Enjoy