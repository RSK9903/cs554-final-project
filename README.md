# Quarantine Kitchen

CS 554-WS, Spring 2020, Professor Hill

### Team Members
- Natalie Bernhard
- Dylan DiGeronimo
- Rachel Kim
- Diaeddin Motan
- Jyotsna Ramaswamy

### Prerequisites
- NodeJS
- MongoDB
- Redis
- GraphicsMagick (installation instructions [here](http://www.graphicsmagick.org/README.html))

### Installing required NPM packages
By running `npm install` in both the `front_end/` and `back_end/` directories, all required NPM packages will be installed.

### Running the application
1. Start the Mongo daemon
```
$ mongod
```
2. Start the Redis server
```
$ redis-server
```
3. Run the backend server
```
$ cd back_end/
$ npm start
```
4. Run the frontend application
```
$ cd front_end/
$ npm start
```

### System Architecture
The system is split into two main components:
- A React application, which provides the SPA interface. This is located in `front_end/`.
- A simple Express server, used to interface with MongoDB and serve user, recipe, review, and image data. This is located in `back_end/`.

### Course Technologies:
#### React
The core of our application is a single page React app. We chose to utilize React because of its ability to create composable dynamically-generated user interface components, which is important in a site where new content is added often. 

#### Redis
We chose to utilize Redis' caching abilities to cache recipes that have been recently accessed by the user in order to populate a history component.

#### Firebase Auth
Our sign-up/sign-in system is implemented using Firebase. Aside from making managing authenticated user-only pages, Firebase also allows us to give users the choice to create a new profile or sign in using an existing Google or Facebook account. 

### Non-Course Technologies:
#### GraphicsMagick
[GraphicsMagick](http://www.graphicsmagick.org/) is an open-source tool for image processing. We use it in conjunction with the [gm NodeJS wrapper package](https://www.npmjs.com/package/gm) to automatically rename and compress user-uploaded recipe images to a predetermined resolution. This reduces the required amount of storage used per image, simplifies the process of serving static images, and makes recipe images display uniformly.

#### jsPDF
[jsPDF](https://parall.ax/products/jspdf) is a JavaScript library allowing for client-side generation of PDF files. We leverage it to offer users the ability to print out recipe pages. When a user clicks on the print button of a recipe, jsPDF is used to gather select components of the recipe page, preserving the HTML formatting of the text while allowing for the precision placement of recipe images.