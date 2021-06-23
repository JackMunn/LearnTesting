// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run


describe('Whats the drivers first name',  () => {

    it('#9206 First name field pre-populates from the PagePro app', () => {

        //checks if firname is not empty
        cy.get('input#DriverFirstName_TXT').should('not.be.not.be.empty')
    })

    it('#9207 First name field is locked down and cannot be edited by the customer', () => {
     
        //checks if firname is disabled
        cy.get('input#DriverFirstName_TXT').should('be.disabled')
    })
})






    // it('Happy Path', () => {
    //     cy.visit('https://veygolearnpublicuat.instanda.com/Public/QuickQuoteQuestions?PackageId=19519&pageNumber=1')
    //     cy.viewport("iphone-8")

     
    //     // types in password field
    //     cy.get('input#publicUatPassword').type('f"Xvz"JfP2hLqPe{')
    //     //clicks signin
    //     cy.get('button[class="btn btn-primary  instanda-btn"]').click()

    //     // checks we're on the home page
    //     cy.url().should('include','/Public/Index')

    //     //clicks to open nav bar
    //     cy.get('[data-target=".navbar-ex1-collapse"]').click()
    //     // opens link to start quote
    //     cy.contains('Get a quote for Veygo Learn').click()
    //     //checks we're on quick quote questions
    //     cy.url().should('include','Public/QuickQuoteQuestions')

    //     cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()

//     })
