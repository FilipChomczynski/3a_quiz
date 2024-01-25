
document.querySelector("#joinbtn").addEventListener('click', ()=>{
    console.log("likdsa");
    let UID = window.localStorage.getItem("UID");
    if(!UID)
        {
            UID = Math.floor(Math.random()*100000000000)+`_`+(new Date).getTime();        
            window.localStorage.setItem("UID", UID);
        }
    console.log(UID);

    let username = window.localStorage.getItem("username");
    if(!username)
    {
        let usernameValue = document.querySelector("#username").value;
        window.localStorage.setItem("username", usernameValue);
    }
    
    let connect = io('ws://localhost:3000');
    //console.log(connect)
    connect.on('connect', ()=>{
        console.log("Połączono", connect.id)
    })

    // putanie o imie usera
    connect.on('username', ()=>{
      connect.emit('username', document.querySelector("#username").value, UID);
      window.location.href = "/index.html"
    })
})
