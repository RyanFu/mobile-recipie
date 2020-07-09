# mobile-recipie

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) 
[![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack) 
[![Website](https://img.shields.io/badge/View-Website-blue)](https://code-and-response.github.io/Project-Sample/)

A basic GitHub repository example for Call for Code submissions and those projects that join the Code and Response initiative. Not all sections or files are required. You can make this as simple or as in-depth as you need.



## Contents

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Long description](#long-description)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Running the tests](#running-the-tests)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Versioning](#versioning)
1. [Authors](#authors)
1. [License](#license)
1. [Acknowledgments](#acknowledgments)

## Short description

### What's the problem?

Part of the World Health Organization's guidance on limiting further spread of COVID-19 is to practice social distancing. As a result, schools in most affected areas are taking precautionary measures by closing their facilities. With school-aged children at home for an indeterminate amount of time,  keeping them engaged, entertained, and on top of their education is important.

### How can technology help?

mobile-recipie will allow users to search for recipes based on what categories they like, what ingredients they have, or what their diet goals are. Users can see all the ingredients and instructions for recipes they find and even save them to their cookbook. In the future we want to build a community around pocket chef and make it more interactive by allowing people to share their own recipes, like and review recipes, and even subscribe to other users! This will create a sense of community around cooking at home and people will be excited to learn new ideas and share their own.  

### The idea

We want to start by simplifying the process of finding recipes. Instead of searching all over the internet for recipes that you can only save as a link we will allow users to do all their searching in one place and save all the recipes they find to a cookbook. From there we want to get users even more involved by building a sense of community around cooking at home. Allowing users to showcase their own recipes will be a fun and exciting way for them to connect with other people. Everyone in the pocket chef community will be able to review recipes, subscribe to chefs that they like, and chat with each other if they want to collaborate on new recipe ideas or cooking tips! 

## Demo video

## The architecture
![](images/architecture-diagram.png)

This solution idea uses a mobile application that invokes a remote API to obtain the various recipes shown to the user. 
Through the mobile app, the user gains access to hundreds of recipes created by a community of users who also love cooking. 
By means of using RapidAPI, our solution can get recipe information from a famous recipe site called Yummly. 

Using IBM Cloud natural language processing technology (Watson Assistant),  the user can chat with his own virtual assistant who, based on a list of ingredients specified by the user, suggests the best recipes that match the query made by the user. To achieve its goal, the Watson Assistant, in conjunction with IBM Cloud Functions service, invokes the remote API to get the information of the recipes shown to the user. 

Currently, the solution lets the user store his favorites recipes in his cookbook using the device local storage, but it is also prepared to use IBM Cloud Cloudant service to permanently store his cookbook. This functionality and others that need permanent persistence will be implemented in future phases. 

1. The user launches the mobile app and can interact with it to gain access to the recipes. The user can search recipes by type of cuisine and also by making queries using a form. 
2. The mobile app calls Yummly APIs to get the information the recipes that match the queries made by the user. 
3. The user interacts with Watson Assistant sending messages to a NodeJs backend application. 
4. The NodeJs backend application invokes Watson Assistant via NodeJs API. 
5. Watson Assistant invokes IBM Cloud Functions and passes the entities detected as part of Watson's natural language processing functionality. 
6. IBM Cloud Functions queries Yummly API and returns the results to the user. 
7. The mobile app invokes the NodeJs backend application to store the cookbook of the user. 

## Long description
Pocket chef is every quarantined cook’s best friend that provides delicious recipes in uncertain times. Pocket chef has three easy ways for users to browse for a new recipe. Search allows users to enter ingredients they have on hand and the max calorie count they want in their meal. The app returns a list of recipes that meet their demands. The cuisines tab allows users to find recipes based on their favorite types of food. The chef assistant allows you to interact with a virtual chat bot to ask for recipes with specific ingredients. Each of these pages delivers recipe ideas, if you like the recipe you can click on it and display a recipe details page which will show you the ingredients and preparation steps. If you want to save a recipe for later reference you can save it to your cook book which allows you to find recipes again without searching.



## Project roadmap

Our teams goal is to add even more features to help people stuck at home by
* Giving users the ability to create recipes and share them with other
* Integrating "cart tally" functionality to add multiple recipes to a shopping cart, total all the ingredients, and place order with Instacart.
* Integrating ways for restaurants to sponsor their recipes and advertise to users
* Integrating a way for the user to buy make at home recipe kits from restaurants through pick up or delivery
* Ability for users to create custom diet goals and filter all recipes to support those goals
* Utilize Watson AI to suggest recipes a user might enjoy based on previously saved or reviewed recipes.
* Create user profile where you can showcase all your recipes and other users can subscribe to you


## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them
1. Node.js  version 10 and up and npm version 6 and up would need to be preinstalled.
2. If Node.js is not installed:
2.1 Go to the web site: https://nodejs.org/en/download/
2.2 install for proper system.


### Installing

A step by step series of examples that tell you how to get a development env running
1. create Folder
2. clone the repo:

>> git clone https://gitlab.com/hackaton-recipes/recipes.git
3. Go into server-app folder via cmd/shell/gitBash
>> cd server-app
>> npm  install
>> npm start

Server is running at http://127.0.0.1:3000/

4. To test running app we can use curl or Postman script located in /Test folder:
4.1 Install curl if needed
>> npm install curl
	Or from source:
>>  git clone git://github.com/ianjorgensen/curl.git 
>>  cd curl
>>  npm link .

>> curl localhost:3000

Response: 

{
    "api": "chef-recipe",
    "company": "mycompany.com",
    "status": "ok",
    "timestamp": "2020-04-24T16:35:09.414Z"
}

5. Go to <mobile-app> folder
>> cd ..
>> cd mobile-app
>> npm install
>> npm start

6. To test running app use browser GET method : localhost:8081

## Running the tests
TODO

## Live Demo
[Home Screen](/images/Home.png)
From the home screen you can access the categories, search or assistant tabs
[Cuisines Tab](/images/Cuisines.png)
From the cuisines tab you can click on a cusines and a list of recipes will display,
[Cuisine Results List](/images/CusineRecipes.png)
if you click on a recipe the recipe details page will give you all the ingredients, and preperation steps needed
[Search Tab](/images/SearchRecipes.png)
From the search tab you can enter in the ingredients you have on hand and the calorie limit of the meal you want and a list of recipes will display, if you click on a recipe the recipe details page will give you all the ingredients, and preperation steps needed
[Chef Assisant Tab](/images/ChefAssistant.png)
From the assistant tab you can ask the assistant for a recipe with certain ingredients and the assistant will give you a recipe, if you click on a recipe the recipe details page will give you all the ingredients, and preperation steps needed
[Recipe Details Page](/images/RecipeDetails.png)
Every time you click on a recipe from any of the tabs, the recipe details page will show the ingredients, quanities and preparation steps needed to make that meal.
[My CookBook Tab](/images/MyCookbook.png)
If you like any of the recipes you see from your search, you can save them to your cook book and they will be saved to this tab for future reference.

## Built with

* Mobile App developed with react native 
* Server app developed with nodejs 
* [RapidAPi](https://rapidapi.com/apidojo/api/yummly2) - Yummly API
* [IBM Watson Assistant](https://www.ibm.com/cloud/watson-assistant/?p1=Search&p4=p50290480262&p5=b&cm_mmc=Search_Google-_-1S_1S-_-WW_NA-_-%2Bwatson%20%2Bassistant_b&cm_mmca7=71700000060917569&cm_mmca8=aud-311016886972:kwd-451214968547&cm_mmca9=CjwKCAjwnIr1BRAWEiwA6GpwNcB_ptP0V2thZMHL1AHZi8g23tTUf6mOX1OaiXEg4Djpa69CzDQysRoCbW4QAvD_BwE&cm_mmca10=405891754057&cm_mmca11=b&gclid=CjwKCAjwnIr1BRAWEiwA6GpwNcB_ptP0V2thZMHL1AHZi8g23tTUf6mOX1OaiXEg4Djpa69CzDQysRoCbW4QAvD_BwE&gclsrc=aw.ds) - The smarter AI assistant for business 
* [IBM Cloudant](https://cloud.ibm.com/catalog?search=cloudant#search_results) - Fully managed database service for hybrid multicloud applications 
* [IBM Cloud Functions](https://cloud.ibm.com/catalog?search=cloud%20functions#search_results) - Run application code without servers 
* [IBM Cloud Foundry](https://www.ibm.com/cloud/cloud-foundry?p1=Search&p4=43700051838807297&p5=e&cm_mmc=Search_Google-_-1S_1S-_-WW_NA-_-ibm%20cloud%20foundry_e&cm_mmca7=71700000061022122&cm_mmca8=aud-311016886972:kwd-336499027875&cm_mmca9=CjwKCAjwnIr1BRAWEiwA6GpwNXCrudBUy-LJSfiyYsTzub4InStInMds09Zp_O8HXQKYViu-CagN3hoCifUQAvD_BwE&cm_mmca10=420179226367&cm_mmca11=e&gclid=CjwKCAjwnIr1BRAWEiwA6GpwNXCrudBUy-LJSfiyYsTzub4InStInMds09Zp_O8HXQKYViu-CagN3hoCifUQAvD_BwE&gclsrc=aw.ds) - Deploy and scale apps without manually configuring and managing servers 


## Versioning

We use [gitlab](https://github.com/dkolpakov2/mobile-recipie/recipes.git) for repository

## Authors

* Jose Campos
* Dmitry Kolpakov
* Uladzimir Zaranok 
* Paul Wallace
* Jordan Senken 

## License

This project is licensed under the Apache 2 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
* Music in demo video from [BenSound.com](https://www.bensound.com)
