# Prerequisite: Assume that we have GIT/SSL  and repo installed locally

FROM node:13-alpine

ADD lib /cognizant/recipe
ADD cloudant_credentials.json /cognizant/recipe
ADD .env /cognizant/recipe
ADD package.json /cognizant/recipe
ADD server.js /cognizant/recipe

ENV NODE_ENV=dev
ENV PORT 3000
#Port to expose service on
EXPOSE 3000

ENV APPLICATION_NAME="Cognizant_Recipe_Chef"

WORKDIR ./cognizant/recipe
RUN npm install
RUN node -v
RUN npm -v 

CMD [ "npm", "start" ]

## ------ end ---------
