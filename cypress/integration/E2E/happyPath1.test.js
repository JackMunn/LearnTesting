// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run
describe('Happy Path 1',  () => {

    it('Customer can fill in a basic quote', () => {
        //pre-fill a quote
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABHKZ660047N99LP','CF64 5RL','11/05/1988','01234567890','CV53JBZ')
        //click continue
        cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
        // confirms the info is correct from 'your quote'
        cy.prefillQuickQuoteConfirmation()
        // fills in PreQuote Questions by selecting relationship type and whether there's alternative insurance
        cy.prefillPreQuoteQuestions('Parents', 'Yes')

        cy.get('[formaction="PreQuoteQuestionsContinue"]').click()

        cy.prefillQuote()

        cy.get('button#continueButton').click()


        cy.prefillPostQuote()

        cy.get('[formaction="PostQuoteQuestionsContinue"]').click()

        cy.get('input#boltPayButton').click()

        cy.addStripeDetails()

        
   
    })

})