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
  })
})
