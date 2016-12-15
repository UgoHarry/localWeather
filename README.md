Your Local Weather App
------------------

Hey! Welcome and thank you for having a look at Your Local Weather app, a simple web application that provides current and forecasted weather for your location. The application is built on **Nodejs** and **Express js** web framework, using a number of tools and libraries detailed in the following section.
This application can also be previewed at this [Codepen](https://codepen.io/UgoHarry/full/rLRXKW).

----------


Getting Started
-------------

A number of tools were adopted in setting up/building the project are mainly:

 - **Gulp** as the build tool. 
 - **NPM** and **Bower**, the package managers used in managing the libraries and Nodejs packages/frameworks.
 - Front-end **libraries** relevant to the project

#### Set up

 - Ensure git is installed and initiated in your project. Before cloning the repository. To clone the repository, run following command:
 `git clone >>URL<<`
 
 - Download and install **Nodejs** from [Nodejs.org](https://nodejs.org/en/). To check if Nodejs is already installed, open up the command line and run the following command: `node -v`
 This will display the version of Nodejs running on your machine.
 
 -   Install **gulp** by running by the following command: 
 `npm install --global gulp-cli`.
 If you have previously installed gulp globally, run 
 `npm rm --global gulp` to ensure that you old version does not collide with gulp-cli.
 - Run the command `npm install` to install the other packages and dependencies.
 -  Run the command `bower install` to install the front-end dependencies

### Gulp tasks

- To watch files and to perform live-reload after changes run the following gulp command:
`gulp watch`

- To optimise and build files for production run the following gulp command:
`gulp build`

- To run the production ready files on your local server, run the following command: 
`node app`
