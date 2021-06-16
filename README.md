# Organizer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.7.

This is an organizer ipmlemented in Angular framework. You may pick any date on the calendar and add as many tasks for this day as you want. Once you created a task, you may delete it in the future as well.

## Firebase

To run this app you should have an account on Firebase. Go to `https://console.firebase.google.com/`, register, if you haven't yet, and create a new project. Firebase works as a backend server for this app. All your tasks will be stored remotely on Firebase.

## Setting environment variables

Create `.env` file in the root folder and add there an environment variable `FIREBASE_URL` with the url of your project on the firebase server. Example: `FIREBASE_URL=https://organizerapp-00000-default-rtdb.firebaseio.com`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4402/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g c component-name` to generate a new component. You can also use `ng g directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
