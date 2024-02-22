
document.querySelector("#joinbtn").addEventListener('click', () => {
    let usernameValue = document.querySelector("#username").value.trim(); // Pobierz nazwę użytkownika i usuń białe znaki z początku i końca

    if (usernameValue !== "") { // Sprawdź, czy nazwa użytkownika nie jest pusta
        let UID = window.localStorage.getItem("UID");

        if (!UID) {
            UID = Math.floor(Math.random() * 100000000000) + '_' + (new Date).getTime();
            window.localStorage.setItem("UID", UID);
        }

        window.localStorage.setItem("username", usernameValue);

        let connect = io('ws://localhost:3000');

        connect.on('connect', () => {
            console.log("Połączono", connect.id);
        });

        // Wysłanie nazwy użytkownika do serwera
        connect.emit('username', usernameValue, UID);

        // Przekierowanie użytkownika na stronę gry
        window.location.href = "/screen.html";
    } else {
        // Jeśli użytkownik nie wprowadził nazwy użytkownika, wyświetl komunikat lub wykonaj odpowiednie działanie
        console.log("Proszę wprowadzić nazwę użytkownika.");
        // Możesz dodać kod do wyświetlania komunikatu dla użytkownika
    }
});
