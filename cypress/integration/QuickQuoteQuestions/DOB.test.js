// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run

const dayjs = require('dayjs')
const today = dayjs().format('DD/MM/YYYY')
const sixteenYearsOld = dayjs().subtract(17,'year').add(1,'day').format('DD/MM/YYYY')
const seventyfiveYearsOld = dayjs().subtract(76,'year').format('DD/MM/YYYY')

describe('#9236 What is the drivers date of birth? ',  () => {
    it('#9240 Customer is able to select a valid DOB from a calendar pop-up', () => {

        // checks if calendar widget is not in the DOM
        cy.get('.bootstrap-datetimepicker-widget ').should('not.exist')
        // clicks calendar widget for DOB question
        cy.get('#question181335 > .instanda-text-question > .instanda-question-input.col-xs-12 > .instanda-question-input > .input-group-addon > .glyphicon').click()
        // checks the calendar widget is in the DOM
        cy.get('.bootstrap-datetimepicker-widget ').should('exist')
        // clicks calendar - I don't think this is doing much at this point
        cy.get('.bootstrap-datetimepicker-widget ').click()

    })

    it('#9237 Customer sees error message if under 17 years of age', () => {

        //error message 'driver is too young' should not already exist in the DOM yet
        cy.get('[class="label label-danger field-validation-error driver-too-young"]').should('not.exist')
        // fill in quote with todays date for subscription start, and an age making someone a day younger than 17
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',today,'ABHKZ660047N99LP','CF645RL',sixteenYearsOld,'01234567890','CV53JBZ')
        //error message should  now exist
        cy.get('[class="label label-danger field-validation-error driver-too-young"]').should('exist')
        //submit the page
        cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
        //check the user can still see DOB field (and isn't able to proceeded to the next page)
        cy.get('#DriversDOB_DATE').should('exist')

    })

    it('#9238 Customer sees error message if over 75 years of age', () => {
        //error message 'driver is too young' should not already exist in the DOM yet
        cy.get('[class="label label-danger field-validation-error driver-too-old"]').should('not.exist')
        // fill in quote with todays date for subscription start, and an age making someone a day younger than 17
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',today,'ABHKZ660047N99LP','CF645RL',seventyfiveYearsOld,'01234567890','CV53JBZ')
        //error message should  now exist
        cy.get('[class="label label-danger field-validation-error driver-too-old"]').should('exist')
        //submit the page
        cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
        //check the user can still see DOB field (and isn't able to proceeded to the next page)
        cy.get('#DriversDOB_DATE').should('exist')
    })

    it('#9306 Page level error and re-focus occurs when DOB is missing and customers tries to proceed with quote', () => {
        //checks please enter a date validation error is not in the DOM
        cy.get('#DriversDOB_DATE-error').should('not.exist')
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',today,'ABHKZ660047N99LP','CF645RL','11/05/1988','01234567890','CV53JBZ')
        // clears DOB input
        cy.get('#DriversDOB_DATE').clear()
        // submits the page with a missing DOB
        cy.get('[formaction="QuickQuoteQuestionsContinue"]').click()
        // checks please enter a date validation error is in the DOM
        cy.get('#DriversDOB_DATE-error').should('exist')
        // checks if the focus is on the DOB input field, the cause of the error 
        cy.focused().should('id','DriversDOB_DATE')


    })
})
