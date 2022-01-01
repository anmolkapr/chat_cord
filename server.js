const path = require('path');
const http = require('http');

const express = require('express');
const socketio = require("socket.io");
const formatMessage = require("./utils/messages")

const  
{userJoin,
getCurrentUser,
userLeave,
getRoomUsers
}  = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "Admin";
app.use(express.static(path.join(__dirname,'public')));

io.on('connection',socket => {
    // console.log("New Web connection");
    socket.on('joinRoom',({username,room}) =>{
        
        const user = userJoin(socket.id,username,room);
        socket.join(user.room);

        socket.emit('message',formatMessage(botName,'Welcome to CHatcord!'));

    //runs hwhen a user connects broadcast emits to everyone that is excdpt the sonnceting clientconnecte dwhereas normal 
    //emit connects only one person 
    socket.broadcast.to(user.room).emit('message',formatMessage(botName,` ${user.username} has joined the chat`));
 
    io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
      
    });
    

    
    // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

    //runs when client is disconnected
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
    
        if (user) {
          io.to(user.room).emit(
            'message',
            formatMessage(botName, `${user.username} has left the chat`)
          );
    
          // Send users and room info
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
        }
      });
    
    
});
//basicall y above is executed when we have on state 
//whenever a clien cnnects themessage is displayed

const PORT = 3000 | process.env.PORT;

server.listen(PORT, () => console.log(`the server is runnngn on ${PORT}`));