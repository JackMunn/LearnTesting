// enables auto-complete
/// <reference types="cypress" />  

// command line help -> https://docs.cypress.io/guides/guides/command-line#cypress-run

const dayjs = require('dayjs')
const todayPlus31 = dayjs().add(31,'day').format('DD/MM/YYYY')
const todayMinus31 =  dayjs().subtract(31,'day').format('DD/MM/YYYY')

describe('When do want the subscription to start?',  () => {

    it('#9217  Start Date field cannot be set more than 30 days in the future', () => {
        cy.get('[class="label label-danger field-validation-error invalid-start-date"]').should('not.exist') 
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',todayPlus31,'ENGNK611146Q99GL','CF645RL','11/05/1988','01234567890','CV53JBZ')

        //checks if class changes to show subscription start date validation error 
        cy.get('[class="label label-danger field-validation-error invalid-start-date"]').should('exist') 
    })

    it('#9218 Start date cannot be in the past', () => {
        cy.get('[class="label label-danger field-validation-error invalid-start-date"]').should('not.exist') 
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',todayMinus31,'ENGNK611146Q99GL','CF645RL','11/05/1988','01234567890','CV53JBZ')

        //checks if class changes to show subscription start date validation error 
        cy.get('[class="label label-danger field-validation-error invalid-start-date"]').should('exist') 
    })

    it('#9507 A start date of todays date does not throw a validation error', () => {
        cy.get('[class="label label-danger field-validation-error invalid-start-date"]').should('not.exist') 
        cy.prefillQuickQuoteQuestions('Jack','Munn','jackmunn@gmail.com',Cypress.todaysDate,'ENGNK611146Q99GL','CF645RL','11/05/1988','01234567890','CV53JBZ')

        //checks if class changes do not show subscription start date validation error 
        cy.get('[class="label label-danger field-validation-error invalid-start-date"]').should('not.exist') 
    })
})
