// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run


describe('Whats the drivers surname',  () => {

    it('#9209  Surname field pre-populates from the PagePro app', () => {

        //checks if firname is not empty
        cy.get('input#DriverLastName_TXT').should('not.be.not.be.empty')
    })

    it('#9210 Surname field is locked down and cannot be edited by the customer', () => {
     
        //checks if firname is disabled
        cy.get('input#DriverLastName_TXT').should('be.disabled')
    })
})
