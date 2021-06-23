// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


beforeEach(() => {
    cy.log('Logging into UAT environment...')

    cy.visit('https://veygolearnpublicuat.instanda.com/Public/QuickQuoteQuestions?PackageId=19519&pageNumber=1')
    cy.viewport("iphone-8")

    // types in password field
    cy.get('input#publicUatPassword').type('f"Xvz"JfP2hLqPe{')
    //clicks signin
    cy.get('button[class="btn btn-primary  instanda-btn"]').click()

    // checks we're on the home page
    cy.url().should('include','/Public/Index')

    //clicks to open nav bar
    cy.get('[data-target=".navbar-ex1-collapse"]').click()
    // opens link to start quote
    cy.contains('Get a quote for Veygo Learn').click()
    //checks we're on quick quote questions
    cy.url().should('include','Public/QuickQuoteQuestions')
  })

  // const cypress = require("cypress")


Cypress.Commands.add('prefillQuickQuoteQuestions', (firstName,surname,email,startDate,dln,postcode,dob,phoneNumber,carReg) => {
 //types first name in
        cy.get('input#DriverFirstName_TXT').type(firstName)
        // types last name ins
        cy.get('input#DriverLastName_TXT').type(surname)
        // enters email
        cy.get('input#EmailAddress_TXT').type(email)

        //enters subscription start
        cy.get('input#PolicyStartDate_DATE').type(startDate)

        //enters DLN
        cy.get('input#DLN_TXT').type(dln)

        //enters postcode and selects address
        cy.get('input#Postcode181334').type(postcode)
        cy.get('button[class="instanda-button btn btn-default"]').click()
        // clicks first returned address in list
        cy.get('div[class="postcodelookup"] > button').first().click()

        //enters DOB
        cy.get('input#DriversDOB_DATE').type(dob)

        //enter phone number
        cy.get('input#PhoneNumber_TXT').type(phoneNumber)
        
        // selects no to previous claims
        cy.get('[class="radio-inline instanda-question-yes-no-no instanda-unselected"]').click()

        // enter car reg
        cy.get('input#VehicleReg').type(carReg)
        cy.get('[class="instanda-buttonList form-group"] > button').click()
        cy.wait(5000)
        //click continue
})