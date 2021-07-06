// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run


describe('#9241 What is the drivers phone number ? ',  () => {
    it('#9242 Entering a phone number with special characters throws an error', () => {
        // checks if 'please enter a valid UK phone number' does not exist
        cy.get('#PhoneNumber_TXT-error').should('not.exist')
        // types invalid special characters into the phone number field
        cy.get('#PhoneNumber_TXT').type('!!!!')
        // clicks off the phone number field (onto the next question), just to trigger the error validation
        cy.get('.instanda-question-yes-no-no').click()
        // checks i the 'please enter a valid UK phone number' exists in the DOM
        cy.get('#PhoneNumber_TXT-error').should('exist')
    })
})
