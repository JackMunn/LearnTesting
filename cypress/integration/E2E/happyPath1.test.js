// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run
describe('Happy Path 1',  () => {

    it('Customer can fill in a basic quote', () => {
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABHKZ660047N99LP','GY12QG','11/05/1988','01234567890','CV53JBZ')

    })

})
