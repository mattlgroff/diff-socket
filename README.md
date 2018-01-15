
# diff-socket

## Dependencies
```npm install``` should take care of these for you.
 - [SocketIO](https://github.com/socketio/socket.io)
 - [Express](https://github.com/expressjs/express)
 - [Request](https://github.com/request/request)
 - [File-System](https://github.com/douzi8/file-system)
 - [Jsdiff](https://github.com/kpdecker/jsdiff)

## Installation
Download or Clone this repo.
```
cd diff-socket
npm install
```
Set Environmental Variable `URL_TO_DIFF` to the Site you want to check for changes.
```
npm start
```

## What is this for?

This node server will emit a socket.io message whenever a change is detected in the HTML of the site chosen.
The downside to this is that single-page-apps like React projects won't show any changes.
