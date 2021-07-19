// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run


describe('#9274 Please enter the vehicle registration ', () => {

    it('#9789 Error messages on car reg field dissapear when customer re-enters car reg', () => {
        // checks that the 'Please enter the car registration' error is not displaying
        cy.get('#registration-empty_181362').should('have.attr', 'style', 'display:none')
        // clicks to proceed with quote, despite car reg field being empty
        cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
        // checks that the 'Please enter the car registration' does not have a display of none (e.g. is showing)
        cy.get('#registration-empty_181362').should('not.have.attr', 'style', 'display:none')
    })

    it.only('#9788 Car information panel populates assuming car details are successfully received (200, stubbed)', () => {
        // Checks the car car panel doesn't exist prior to the car reg search being triggered
        cy.get('.car-card').should('not.exist')

        // sets up stubbing, to intercept a valid car reg search
        cy.fixture('ExperianMock-200').then((data) => {
            cy.intercept('GET', 'https://veygolearnpublicuat.instanda.com/Public/LookupCarDetails?registration=cv53jbz', )
                .as('getCarReg200')

        })
        // type car reg in input - must match the query params of the intercept above
        cy.get('input#VehicleReg').type('cv53jbz')
        // click search
        cy.get('[class="instanda-buttonList form-group"] > button').click()
        cy.wait('@getCarReg200').then(({response}) => {
            expect(response.statusCode).to.eq(200)
        })
        // assertion that the modal displayed should match the details provided in the intercept
        cy.get('.car-card').should('exist')
        cy.get('.car-card__make').should('contain', 'VOLKSWAGEN')
        cy.get('.car-card__model').should('contain', 'POLO SE')
        cy.get('.car-card__reg').should('contain', 'cv53jbz')
        cy.get('.car-card__year').should('contain', '2003')

    })

    it('#9276 Entering a car reg that returns Vehicle Not Found prompts an error message', () => {

        // checks the 'Vehicle Not Found' error message has CSS to ensure it DOES NOT appear to customers 
        cy.get('#vehicle-not-found_181362').should('have.attr', 'style', 'display:none')

        // sets up stubbing, to intercept the car reg search with a car that will return not found
        cy.intercept('GET', 'https://veygolearnpublicuat.instanda.com/Public/LookupCarDetails?registration=ZZ99ZZZ', {
            statusCode: 200,
            body: ['VehicleNotFound'],
        })

        // type car reg in input - must match the query params of the intercept above
        cy.get('input#VehicleReg').type('ZZ99ZZZ')
        // click search
        cy.get('[class="instanda-buttonList form-group"] > button').click()

        // checks the 'Vehicle Not Found' error message has CSS to ensure it DOES appear to customers 
        cy.get('#vehicle-not-found_181362').should('not.have.attr', 'style', 'display:none')
    })

    it('#9285 Entering a blank input in Car Reg fields and searching prompts a unique error message', () => {
        // check the error message isn't being displayed on page load
        cy.get('#registration-empty_181362').should('have.attr', 'style', 'display:none')

        // click car reg search, despite the input field being empty
        cy.get('[class="instanda-buttonList form-group"] > button').click()

        // checks to see if 'please enter the registration number' is being displayed
        cy.get('#registration-empty_181362').should('not.have.attr', 'style', 'display:none')
    })

    it('#9286 Error message lookup error appears assuming car lookup is returning 404/503 (stubbed)', () => {
        
        cy.fixture('ExperianMock-404').then(json => {
            cy.intercept('GET', 'https://veygolearnpublicuat.instanda.com/Public/LookupCarDetails?registration=cv53jbz', json)
                .as('getCarReg')
        })


        // check that the error element has a css attribute to ensure it displays 
        cy.get('#vehicle-lookup-error_181362').should('have.attr', 'style', 'display:none')

        // enters in a car reg, it can be whatever as long it matches the query params above
        cy.get('input#VehicleReg').type('cv53jbz')
        // click search
        cy.get('[class="instanda-buttonList form-group"] > button').click()

        // checking header has a 404 as the statusCode
        cy.wait('@getCarReg').then(({response}) => {
            console.log(response)
            expect(response.statusCode).to.eq(404)
        })

        // error element should not have a css attribute of display:none (e.g. it's now visible)
        cy.get('#vehicle-lookup-error_181362').should('not.have.attr', 'style', 'display:none')

    })

    // it.only('#9286 Error message lookup error appears assuming car lookup is returning 404/503 (stubbed)', () => {

    //     // check that the error element has a css attribute to ensure it displays 
    //     cy.get('#vehicle-lookup-error_181362').should('have.attr', 'style', 'display:none')

    //     // enters in a car reg, it can be whatever as long it matches the query params above
    //     cy.get('input#VehicleReg').type('cv53jbz')
    //     // click search
    //     cy.get('[class="instanda-buttonList form-group"] > button').click()
    //     // error element should not have a css attribute of display:none (e.g. it's now visible)
    //     cy.get('#vehicle-lookup-error_181362').should('not.have.attr', 'style', 'display:none')

    // })

    it('#9808 Customers with a vehicle code above 36 should be blocked and see /CannotQuote', () => {
        // The quote is a valid quote, with the exception of the car reg LD66NTV which has an ABI code 
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABHKZ660047N99LP','CF645RL','11/05/1988','01234567890','LD66NTV')
        cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
        cy.url().should('contain', '/CannotQuote')
  

    })

})

// add test for car age -> F202KAM
// add test for van