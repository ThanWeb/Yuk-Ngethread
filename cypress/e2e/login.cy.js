/**
 * - Login spec
 *   - should display login page correctly
 *   - should disabled sign in button when email is invalid
 *   - should disabled sign in button when password is invalid
 *   - should display alert when username and password are incorrect
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })

    it('should display login page correctly', () => {
        cy.get('input[placeholder="yourname@gmail.com"]').should('be.visible')
        cy.get('input[placeholder="yourpassword"]').should('be.visible')
        cy.get('button').contains(/^Sign in$/).should('be.visible')
        cy.get('h1').contains(/^Almost there$/).should('be.visible')
    })

    it('should disabled sign in button when email is invalid', () => {
        cy.get('input[placeholder="yourpassword"]').type('validpass')
        cy.get('button').contains(/^Sign in$/).click()
        cy.get('button').contains(/^Sign in$/).should('be.visible')
        cy.get('h1').contains(/^Almost there$/).should('be.visible')
    })

    it('should disabled sign in button when password is invalid', () => {
        cy.get('input[placeholder="yourname@gmail.com"]').type('validemail@gmail.com')
        cy.get('input[placeholder="yourpassword"]').type('n')
        cy.get('button').contains(/^Sign in$/).click()
        cy.get('button').contains(/^Sign in$/).should('be.visible')
        cy.get('h1').contains(/^Almost there$/).should('be.visible')
    })

    it('should display alert when username and password are incorrect', () => {
        cy.get('input[placeholder="yourname@gmail.com"]').type('wrongemail@gmail.com')
        cy.get('input[placeholder="yourpassword"]').type('wrong_password')
        cy.get('button').contains(/^Sign in$/).click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal('email or password is wrong')
        })
    })

    it('should display homepage when username and password are correct', () => {
        cy.get('input[placeholder="yourname@gmail.com"]').type('hanstest@gmail.com')
        cy.get('input[placeholder="yourpassword"]').type('hanstest')
        cy.get('button').contains(/^Sign in$/).click()
        cy.get('nav').contains(/^Home$/).should('be.visible')
        cy.get('nav').contains(/^Leaderboard$/).should('be.visible')
        cy.get('button').contains('Sign Out').should('be.visible')
    })
})
