# Node.js Cognizant-chef-recipe server application
This app is for Node.js shows a workflow for working with any Node.js app on IBM Cloud or in IBM Cloud Private; 
Development environment, deploy an app locally and on the cloud, and then integrate a IBM Cloud database service in your app.

The Node.js app uses [Express Framework](https://expressjs.com) and 
[Cloudant noSQL DB service](https://console.bluemix.net/catalog/services/cloudant-nosql-db) 
or the [MongoDB Service](http://mongodb.github.io/node-mongodb-native/) 
to add information to a database and then return information from a database to the UI. 
To learn more about how the app connects to Cloudant, 
see the [Cloudant library for Node.js](https://www.npmjs.com/package/cloudant).


## Before to begin

You'll need a [IBM Cloud account](https://console.ng.bluemix.net/registration/), 
[Git](https://git-scm.com/downloads), 
[Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads), 
and [Node](https://nodejs.org/en/) installed. 
If you use [IBM Cloud Private](https://www.ibm.com/cloud-computing/products/ibm-cloud-private/), 
you need access to the [IBM Cloud Private Cloud Foundry](https://www.ibm.com/support/knowledgecenter/en/SSBS6K_2.1.0/cloud_foundry/overview.html) environment.

## Instructions

**IBM Cloud Cloud Foundry**: [Getting started tutorial for Node.js](https://console.bluemix.net/docs/runtimes/nodejs/getting-started.html).


**IBM Cloud Kubernetes Service**: [README-kubernetes.md](README-kubernetes.md)


## Cloud Foundry Deployment
** Cloud Foundry steps **
- Deploy the app
You can use the IBM Cloud CLI to deploy apps to IBM Cloud.
Log in to your IBM Cloud account, and select an API endpoint.

>> ibmcloud login
If you have a federated user ID, instead use the following command to log in with your single sign-on ID. 
See Logging in with a federated ID for more information.


>> ibmcloud login --sso

Target a Cloud Foundry org and space:

>> ibmcloud target --cf

If you don't have an org or a space set up, see Adding orgs and spaces.

From within the get-started-node directory, push your app to IBM Cloud.
>> ibmcloud cf push
	or 
>> ibmcloud cf push cognizant-chef-recipe -b nodejs_buildpack

Deploying your application can take a few minutes. When deployment completes, 
you'll see a message that your app is running. View your app at the URL listed in the output of the push command, 
or view both the app deployment status and the URL by running the following command:

>> ibmcloud cf apps

You can also go to the IBM Cloud resource list External link icon to view your app.

You can troubleshoot errors in the deployment process by using the 
>> ibmcloud cf logs cognizant-chef-recipe --recent  

## Run Server Functiional tests using Postman
** Functional testing using Postman **

The Postman script can be found in the Test parent folder in the GitLab repo
- Status
- List all records
- POST new record
- PUT existing record by ID
- DELETE record by ID
- GET record by name 