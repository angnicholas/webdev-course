# Module 4: Frontend Demonstration

We shall now run the frontend application in tandem with the backend. Notice that we have started two distinct servers on our computers, the backend on port ```3000``` and the frontend on port ```8000```. This simulates, on our own computer, two web servers communicating with each other! 

As we click around on the webpage, the communication is like this:

Browser -> Frontend -> Backend -> Frontend -> Browser

## Run the application

Run the frontend server in tandem with the backend (Open a new shell)
```npm install```
```npm start``` 

## Overview

Tbh I'm quite bad at frontend. But it's mostly just code the components in a structure and then use the React Inspector to look at where the elements are.

Then use Console to view what is happening (request traces etc.)

Javascript is basically bloatware (Look at the size of node-packages!!!!!)

Things to note: requests are handled asynchronously. So you send a request, but it might not be filled yet. So you need to provide a callback to let the system know what to do once the request is done. This is in the form of a function passed to the handler (lazy evaluation technique).

Cors problem: https://stackoverflow.com/questions/22476273/no-access-control-allow-origin-header-is-present-on-the-requested-resource-i - need to modify backend to allow same origin

Currently, shows a list view and detail view.

In the future - might want to show how to do CRUD using a form in React.

For read-only purposes, I guess, this will suffice.

I'm not really good at Frontend sorry