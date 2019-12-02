# Hotree

## Description

This is a simple app with form for adding events. You have to fill
`title`, `description`, `coordinator` and if event is paid `event fee`.
Rest of is voluntary. I implemented validation of each field, for example: 
`email` is not required but it have to have right form. 
`title` is mandatory and it is impossible to add event without `title`.
Event date is divided for `date` and `time`. 
You can't set up earlier date than actual date and setting time is in 12h format.
If the is added correctly the appropriate message will be displayed. 
Event details will be displayed in browser console (to open browser console press `F12`).

## Configuration

- Download the node.js installer for Windows and install it - [NodeJS](https://nodejs.org/en/download/)
  
- Install TypeScript
```shell
npm install -g typescript
```

- Install Angular
```shell
npm install -g @angular/cli
```

- Install [git](https://git-for-windows.github.io/) and follow this [instructions](https://www.atlassian.com/git/tutorials/install-git#windows)

- Clone repository to your computer
```shell
git clone https://github.com/mikolajskromny/hotree.git
```

## Running the application

- Open CMD in repository directory and type:

    - Install all modules
    ```shel
    npm install
    ```
  
    - Run the app
    ```shell
    ng serve -o
    ```
  
    - App will open automatically in default browser on [http://localhost:4200/](http://localhost:4200/) 
