const express = require('express');
const app = express();
const env = require('dotenv');
env.config(); // process.env.hostconst fs = require('fs');
const fs = require('fs');

app.use(express.static(__dirname+'/public'));
let server = app.listen(3000, ()=>{
    console.log("http://localhost:3000");    
})

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
        Credentials: true
    }
})
let klienci = [];

io.on("connection", client=>{
    console.log("nawiązano połączenie: ", client.id);
    client.emit('username');
    client.on('username', (username, uid)=>{
        console.log("Klient:", username, uid);
        let kl = klienci.filter(e=>e.uid==uid)[0];
        if(!kl)
        {
            kl = {'uid': uid, 'username': username, "socket": client}
            klienci.push(kl);
        }
     })
     client.on("koniec", (number, string) =>{
        let c;
        let i = fs.readFile('./public/tablica_wynikow.json', (err, inputD) => {
            if (err) throw err;
            
            console.log(inputD.toString());
            let jsonn = JSON.parse(inputD.toString());
            jsonn.push({
                name: string,
                points: number
            })
            j = JSON.stringify(jsonn);
            fs.writeFile('./public/tablica_wynikow.json', j, (err) => {
                if (err) throw err;
                else{
                console.log("The file is updated with the given data")
            }
         })
         })
        // let jsonn = JSON.parse(c);
        // jsonn.push({
        //     name: string,
        //     points: number
        // })
        // j = JSON.stringify(jsonn);
        // fs.writeFile('./public/tablica_wynikow.json', j, (err) => {
        //     if (err) throw err;
        //     else{
        //        console.log("The file is updated with the given data")
        //     }
        //  })
        // console.log(c)
        })
        
     
});