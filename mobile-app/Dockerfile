# Prerequisite: Assume that we have GIT/SSL , project has been cloned and installed locally

# Setting Docker Engine
FROM node:13-alpine

ADD android /cognizant/recipe
ADD ios /cognizant/recipe
ADD src /cognizant/recipe
ADD .env /cognizant/recipe
ADD package.json /cognizant/recipe
ADD server.js /cognizant/recipe
ADD index.js /cognizant/recipe
ADD metro.config /cognizant/recipe
ADD app.json /cognizant/recipe
ADD App.js /cognizant/recipe
ADD package.json /cognizant/recipe

ENV NODE_ENV=dev
ENV PORT 9000
#Port to expose service on
EXPOSE 9000

ENV APPLICATION_NAME="Hackathon_Recipe"
WORKDIR ./cognizant/recipe
RUN npm install && npx react-native init solutionstarterkitcooperation2020app 

CMD [ "npm", "start" ]

## ------ end ---------
