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
- GraphicsMagick (installation instructions [here](http://www.graphicsmagick.org/README.html))

### Installing required NPM packages
By running `npm install` in both the `front_end/` and `back_end/` directories, all required NPM packages will be installed.

### Running the application
1. Start the Mongo daemon
```
$ mongod
```
2. Run the backend server
```
$ cd back_end/
$ npm start
```
3. Run the frontend application
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
***FILL THIS IN***

#### Redis
***FILL THIS IN***

### Non-Course Technologies:
#### GraphicsMagick
[GraphicsMagick](http://www.graphicsmagick.org/) is an open-source tool for image processing. We use it in conjunction with the [gm NodeJS wrapper package](https://www.npmjs.com/package/gm) to automatically rename and compress user-uploaded recipe images to a predetermined resolution. This reduces the required amount of storage used per image, simplifies the process of serving static images, and makes recipe images display uniformly.

#### jsPDF
[jsPDF](https://parall.ax/products/jspdf) is a JavaScript library allowing for client-side generation of PDF files. We leverage it to offer users the ability to print out recipe pages. When a user clicks on the print button of a recipe, jsPDF is used to gather select components of the recipe page, preserving the HTML formatting of the text while allowing for the precision placement of recipe images.