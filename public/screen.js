if (window.localStorage.getItem("UID") === null || window.localStorage.getItem("username") === null) {
    window.location.href = "/login.html";
  }

let connect = io('ws://localhost:3000');
connect.on('connect', ()=>{
    console.log("Połączono", connect.id)

})
let pytania = [];
let punkty = 0;
let pytanie;

const $=name=>document.querySelector(name);

function czytajPytania(){
    fetch('pytania.json')
    .then(e=>e.json())
    .then(j=>{
        pytania = [];
        pytania.push(...j);
        losujPytanie(null);
    })

}

function losujPytanie(element)
{
    pytanie = pytania.filter(e=>!e.wylosowane)[0];
    console.log(pytanie);
    if(!pytanie)
    {
        alert("koniec skurwysynu")
    }
    pytanie.wylosowane = true;
    $('.pytanie>h3').innerHTML = pytanie.pytanie;
    for(let i=0;i<pytanie.odp.length; i++) {
        $(`.p${i}`).innerHTML = pytanie.odp[i];
        $(`.p${i}`).id = i;
    }
    if (element) {
        console.log("pop " + pytanie.poprawna);
        if (pytanie.poprawna == element.id) {
            punkty++;
            window.localStorage.setItem = punkty;
            console.log("jupi");
        }
    }
    document.querySelector("body").style.backgroundColor = "rgb(55, 23, 77)";
}

czytajPytania()




let btn = document.querySelectorAll(".b");

btn.forEach(element => {
    element.addEventListener("click", e=>{
        if (pytanie.poprawna == element.id) {
            punkty++;
            window.localStorage.setItem("punkty", punkty);
            document.getElementById("punkty").innerText = "Punkty: " + punkty;
            document.querySelector("body").style.backgroundColor = "green";
            setTimeout(losujPytanie,1000);
            // document.querySelector("body").style.backgroundColor = "rgb(55, 23, 77)";
        }
        else{
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(losujPytanie,1000);
            // document.querySelector("body").style.backgroundColor = "rgb(55, 23, 77)";
        }
        console.log(punkty);
        // losujPytanie();
    })
});
