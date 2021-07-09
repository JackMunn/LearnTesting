// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run
describe('Happy Path 1',  () => {
    it('Customer can fill in a basic quote', () => {
        
        //pre-fill a quote
        cy.log('Staring smoke test')
        // cy.percySnapshot('Empty Quick Quote Page')
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABHKZ660047N99LP','CF64 5RL','11/05/1988','01234567890','CV53JBZ')
        // cy.percySnapshot('Filled Quick Quote Page (No Errors)', { widths: [375]})

        // click continue
        cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
        // confirms the info is correct from 'your quote'
        // cy.percySnapshot('Quick Quote Confirmation', { widths: [375]})

        cy.prefillQuickQuoteConfirmation()
        // fills in PreQuote Questions by selecting relationship type and whether there's alternative insurance
        // cy.percySnapshot('Empty PreQuote Questions', { widths: [375]})

        cy.prefillPreQuoteQuestions('Parents', 'Yes')
        // cy.percySnapshot('Filled PreQuote Questions', { widths: [375]})

        cy.get('[formaction="PreQuoteQuestionsContinue"]').click()
        // cy.percySnapshot('Empty Quote Page', { widths: [375]})

        cy.prefillQuote()
        // cy.percySnapshot('Filled Quote Page', { widths: [375]})

        cy.get('button#continueButton').click()


        cy.prefillPostQuote()
        // cy.percySnapshot('Filled Post Quote Page', { widths: [375]})


        cy.get('[formaction="PostQuoteQuestionsContinue"]').click()

        cy.get('input#boltPayButton').click()

        // cy.addStripeDetails()
    
        // cy.log('Journey completed successfully')


   
    })

})
