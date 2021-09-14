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

    // accept cookies
    cy.get('#cky-btn-accept').click()
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
        cy.document().then( document => {
          // enables the first name, surname, and email input fields so they can be written to
          console.log(document.querySelector(`input[name="DriverFirstName_TXT"]`).removeAttribute("readonly"));
          console.log(document.querySelector(`input[name="DriverLastName_TXT"]`).removeAttribute("readonly"));
          console.log(document.querySelector(`input[name="EmailAddress_TXT"]`).removeAttribute("readonly"));


        })
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
        cy.get('#Lookup181334 > .instanda-button').click({force:true})
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

Cypress.Commands.add('prefillQuickQuoteConfirmation', () => {
  // checks we're on the quick quote page, which doesn't help differentiate it from the preceding page - but will at least check if the quote was declined
   cy.url().should('include','Public/QuickQuote')
   cy.contains('Confirm all the info above is correct')
   // clicks confirmation radio button
   cy.get('[value="19663"]').click()
   cy.wait(25000)
   // page will automatically progress to prequote question, so this checks it did
      
 })

 Cypress.Commands.add('prefillPreQuoteQuestions', (ownerRelationship, confirmAlternativeInsurance) => {
  // ownerRelationship should be 'Parents', 'Partner', 'Family', 'Friend', 'Colleague', 'Other'
  // confirmAlternativeInsurance should be 'Yes' or 'No'

  cy.url().should('include','/PreQuoteQuestions')

  // clicks no to ownership of the car
  cy.get('[class="radio-inline instanda-question-yes-no-parent-no instanda-unselected"]').click()
  // selects parents relationships
  cy.get('select[name="OwnerRelationship_TXT"]').select(ownerRelationship)
  // selects insurance already in place
  cy.get('select[name="VehicleInsurance_TXT"]').select(confirmAlternativeInsurance)

 })

 Cypress.Commands.add('prefillQuote', ( ) => {
  cy.url().should('include','/Quote')
  // your fine quote for Veygo Learn. It might be worth some regulatory checks and pricing. As it includes T&Cs and premium.
  // also car info and policy start dates

 })

 Cypress.Commands.add('prefillPostQuote', ( ) => {
  cy.url().should('include','/Public/PostQuoteQuestions')

  cy.get('select[name="BillingTitle"]').select('Mr')

 })

 Cypress.Commands.add('addStripeDetails', () => {
        // I have no real idea what this is, but I copied it from stack overflow and it works... :shifty:

  describe('Make Stripe Payment', () => {

      cy.wait(15000)
      cy.get('iframe').then($iframe => {
        const doc = $iframe.contents()
        cy.wrap(doc.find('#cardNumber')).type('4242424242424242')
        cy.wrap(doc.find('#expiryDate')).type('0122')
        cy.wrap(doc.find('#cvc')).type('123').type('{enter}').wait(3000)
        cy.wrap(doc.find('button')[1]).click()

        // cy.wrap(doc.find('process payment')).click()



        // let input = doc.find('input')[0]
        // cy
        //   .wrap(input)
        //   .type('4242', {force: true})
        //   .type('4242')
        //   .type('4242')
        //   .type('4242')
        // input = doc.find('input')[1]
        // cy
        //   .wrap(input)
        //   .clear()
        //   .type('12')
        //   .type('22')
        // input = doc.find('input')[2]
        // cy
        //   .wrap(input)
        //   .type('123')
        //   .type('{enter}')

          // let button = doc.find('button')[1]

          // cy
          //   .wrap(button).click()
          //   // .type('{enter}')

      })
      cy.wait(15000)
      cy.url().should('include','/Public/Confirmation')

  })
})