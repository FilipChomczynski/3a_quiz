describe('Test logowania i sprawdzania wartości w localStorage', () => {
  it('Logowanie, dodanie wartości do localStorage i sprawdzenie', () => {
    // Otwórz stronę logowania
    cy.visit('http://localhost:3000/login.html')

    // Wpisz nazwę użytkownika
    cy.get('#username').type('nazwa_uzytkownika')

    // Kliknij przycisk "Dołącz"
    cy.get('#joinbtn').click()

    // Sprawdź, czy w localStorage są trzy wartości
    cy.window().then((win) => {
      const localStorage = win.localStorage
      cy.wrap(localStorage.getItem('username')).should('exist')
      cy.wrap(localStorage.getItem('UID')).should('exist')
      cy.wrap(localStorage.getItem('punkty')).should('exist')

    })
    cy.request('/screen.js').then((response) => {
      // Sprawdź status odpowiedzi
      expect(response.status).to.eq(200)
      // Jeśli plik istnieje, zaloguj to do konsoli
      cy.log('Plik screen.js został znaleziony na stronie.')
    })
    // Otwórz stronę z aplikacją
    cy.visit('http://localhost:3000/screen.html')

    // Pobierz aktualną liczbę punktów z localStorage
    cy.window().its('localStorage.punkty').then(punkty => {
      const initialPoints = parseInt(punkty || 0)

      // Kliknij na odpowiedź, która nie zmienia tła na zielone
      cy.get('#0').click()

      // Poczekaj na zmianę punktów w localStorage
      cy.wait(2000)

      // Sprawdź, czy punkty się nie zliczają
      cy.window().its('localStorage.punkty').should('eq', initialPoints.toString())

      // Kliknij na odpowiedź, która zmienia tło na zielone
      cy.get('#1').click()

      // Poczekaj na zmianę punktów w localStorage
      cy.wait(2000)

      // Sprawdź, czy punkty się zliczają
      cy.window().its('localStorage.punkty').should('eq', (initialPoints + 1).toString())
    })
  })
})
