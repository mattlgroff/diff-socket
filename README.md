
# diff-socket

## Dependencies
```npm install``` should take care of these for you.
 - [SocketIO](https://github.com/socketio/socket.io)
 - [Express](https://github.com/expressjs/express)
 - [Request](https://github.com/request/request)
 - [File-System](https://github.com/douzi8/file-system)
 - [Crypto](https://github.com/npm/deprecate-holder)

## Installation
Download or Clone this repo.
```
cd diff-socket
npm install
npm start
```

## Example .env File
```
PORT=8080
TIME_IN_SECONDS=30
```

## Client Apps
- [diff-bot](https://github.com/mattlgroff/diff-bot) Discord WebHook
- [diff-tweeter](https://github.com/mattlgroff/diff-tweeter) Twitter API

## What is this for?
This node server will emit a socket.io message whenever a change is detected in the HTML of the site chosen.
The downside to this is that single-page-apps like React projects won't show any changes.
