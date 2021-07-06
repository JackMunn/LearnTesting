


    // enables auto-complete
    /// <reference types="cypress" />  

    // command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run


    describe('Please enter the drivers postcode',  () => {

        it('#9228  Error message appears when Postcode field is empty and find address is clicked', () => {

                
            cy.on('window:alert', (alertText) => {
                    expect(alertText).contains('Please enter the postcode')
            })
            //enters postcode and selects address
            cy.get('input#Postcode181334').click()
            cy.get('button[class="instanda-button btn btn-default"]').click()

        })

        it('#9229 Error message appears when a customer enters in a non-GB postcode (GY12QG, BT17 9JZ)', () => {
            cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABHKZ660047N99LP','GY12QG','11/05/1988','01234567890','CV53JBZ')
            cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
            cy.url().should('include','/Public/CannotQuote')
            cy.go('back')
            // goes back a page to re-enter a different reg
            // enter car reg
            cy.get('input#VehicleReg').type('GY12QG')
            cy.get('[class="instanda-buttonList form-group"] > button').click()

            //click continue command
            cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
            cy.url().should('include','/Public/CannotQuote')

        })


        it('#9230  Error message appears when a postcode is not in the correct format', () => {

                cy.contains("The postcode doesn't appear to have been entered correctly").should('not.exist') 
                cy.on('window:alert', (alertText) => {
                    expect(alertText).contains("The postcode doesn't appear to have been entered correctly")
                })
                //enters postcode and selects address
                cy.get('input#Postcode181334').type('blergh')
                cy.get('button[class="instanda-button btn btn-default"]').click()
        })

        it('#9231  Address drop-down appears and is clickable when a valid postcode is entered, customer can proceed to next page', () => {
            cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABHKZ660047N99LP','cf31 1ty','11/05/1988','01234567890','CV53JBZ')
            cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
            cy.contains('Confirm all the info above is correct').should('exist')

    
        })

        it('#9232  Customer is able to edit their address after selecting a pre-existing address from dropdown', () => {
            cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABHKZ660047N99LP','cf31 1ty','11/05/1988','01234567890','CV53JBZ')


            //enters postcode and selects address
            cy.get('button[class="edit-btn"]').click()
            cy.get('input#Postcode181334').type('CF64 5RL')
            cy.get('input#AddressLine1').type('test Address line 1')
            cy.get('input#AddressLine2').type('test Address line 2')
            cy.get('input#City').type('test city')
            cy.get('input#County').type('test county')
            cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()

    })

    it('#9233  Customer is able to manually enter a valid GB address', () => {

        cy.get('a[class="address-manual"]').click()
        cy.get('input#Postcode181334').type('CF64 5RL')
        cy.get('input#AddressLine1').type('test Address line 1')
        cy.get('input#AddressLine2').type('test Address line 2')
        cy.get('input#City').type('test city')
        cy.get('input#County').type('test county')

        })

    it('#9234  Customer sees UW decline page if they enter a manual address with a postcode not in our pricing structure ', () => {
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ABHKZ660047N99LP','cf31 1ty','11/05/1988','01234567890','CV53JBZ')


        //enters postcode and selects address
        cy.get('button[class="edit-btn"]').click()
        cy.get('input#Postcode181334').clear()
        cy.get('input#AddressLine1').clear()
        cy.get('input#AddressLine2').clear()
        cy.get('input#City').clear()
        cy.get('input#County').clear()


        cy.get('input#Postcode181334').type('GY12QG')
        cy.get('input#AddressLine1').type('test Address line 1')
        cy.get('input#AddressLine2').type('test Address line 2')
        cy.get('input#City').type('test city')
        cy.get('input#County').type('test county')
        cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()

        cy.url().should('include','/Public/CannotQuote')
    })  

    it.only('#9779 Customer sees an error popup when the postcode lookup service is not available 404', () => {
        
        cy.on('window:alert', (alertText) => {
            expect(alertText).contains('The postcode lookup service is not currently available')
    })
        
        cy.intercept('GET', 'https://veygolearnpublicuat.instanda.com/Public/GetAddressListForPostcode?postcode=SA196TR&questionid=181334', {
            "statusCode": 408
        })
        
        cy.get('input#Postcode181334').type('SA196TR')
        cy.get('button[class="instanda-button btn btn-default"]').click()
        // cy.wait('@AddressLookup')

    })
    })
