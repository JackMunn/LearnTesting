// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run

// TESTS TO ADD!!!
// if ABI code is above 36
// 2019, 2020 registrations FD69 ZNX, CF19TKC, BV20RZM, CN69RZC



describe('Whats the drivers driving licence number',  () => {

    it('#9215  DLN field must be in a valid UK format (front-end validation)', () => {
        //checks if DLN can be in wrong format
        cy.get('input#DLN_TXT').type('xxxx')
        cy.get('[class="form-control input-validation-error"]').should('exist')
})

it.only('#9219  MyLicence should return failed when a full licence is entered (AAJBG505291DL9EW)', () => {

    cy.intercept('GET', 'https://veygolearnpublicuat.instanda.com/Public/LookupCarDetails?registration=cv53jbz', {
        statusCode: 404,
        body: ['VehicleNotFound']
    })
    // firstName,surname,email,startDate,dln,postcode,dob,phoneNumber,carReg
    cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'AAJBG505291DL9EW','CF645RL','11/05/1988','01234567890','CV53JBZ')
    
    //clicks continue and checks if the customer is seeing the right page
    cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
    cy.url().should('include','/Public/CannotQuote')
    
})

it.only('#9220  MyLicence decision should return pass when a provision licence is entered (ABHKZ660047N99LP)', () => {
    // firstName,surname,email,startDate,dln,postcode,dob,phoneNumber,carReg
    cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABHKZ660047N99LP','CF645RL','11/05/1988','01234567890','CV53JBZ')
    
    //clicks continue and checks if the customer is seeing the right page
    cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
    cy.contains('Your Quote').should('exist')
})

it('#9222  DLN decision should return fail if a provisional licence has expired (BJNMW311118B99ED)', () => {
    // firstName,surname,email,startDate,dln,postcode,dob,phoneNumber,carReg
    cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'BJNMW311118B99ED','CF645RL','11/05/1988','01234567890','CV53JBZ')
    
    //clicks continue and checks if the customer is seeing the right page
    cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
    cy.url().should('include','/Public/CannotQuote')
})

it('#9223  DLN decision should return fail if a full licence has expired (AAJBG460123QC9HW)', () => {
    // firstName,surname,email,startDate,dln,postcode,dob,phoneNumber,carReg
    cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'AAJBG460123QC9HW','CF645RL','11/05/1988','01234567890','CV53JBZ')
    
    //clicks continue and checks if the customer is seeing the right page
    cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
    cy.url().should('include','/Public/CannotQuote')
})

it('#9224  DLN decision should return fail if a licence is not found (ABCDE701159A99DE)', () => {
    // firstName,surname,email,startDate,dln,postcode,dob,phoneNumber,carReg
    cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABCDE701159A99DE','CF645RL','11/05/1988','01234567890','CV53JBZ')
    
    //clicks continue and checks if the customer is seeing the right page
    cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
    cy.url().should('include','/Public/CannotQuote')
})

it('#9225  DLN decision should return fail if a licence has maximum endorsements (ENGNK611146Q99GL)', () => {
    // firstName,surname,email,startDate,dln,postcode,dob,phoneNumber,carReg
    cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ENGNK611146Q99GL','CF645RL','11/05/1988','01234567890','CV53JBZ')
    
    //clicks continue and checks if the customer is seeing the right page
    cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
    cy.url().should('include','/Public/CannotQuote')
})


    it('#9778 Entering a lowercase drivers licence should not throw a validation error or prevent quoting', () => {
        cy.get('#DriverLastName_TXT[class="form-control valid"]' ).should('not.exist')
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'abhkz660047n99lp','CF645RL','11/05/1988','01234567890','CV53JBZ')
        cy.get('#DriverLastName_TXT[class="form-control valid"]' ).should('exist')
        cy.get('.dln-invalid > :nth-child(3) > .field-validation-error > span').should('not.exist')
        // FINISH THIS TEST ONCE MYLICENCE IS BACK UP
    })
    



})
