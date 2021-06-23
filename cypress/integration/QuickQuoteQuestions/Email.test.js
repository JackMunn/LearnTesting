// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run



describe('Whats the drivers email',  () => {

    it('#9213  Email field pre-populates from the PagePro app', () => {

        //checks if firname is not empty
        cy.get('input#EmailAddress_TXT').should('not.be.not.be.empty')
    })

    it('#9212 Email field is locked down and cannot be edited by the customer', () => {
     
        //checks if firname is disabled
        cy.get('input#EmailAddress_TXT').should('be.disabled')
    })
})
