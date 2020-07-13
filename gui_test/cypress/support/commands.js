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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --


// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const have_value      = 'have.value';

Cypress.Commands.add('login',(inputUserName,inputPassword) =>{

    const userName        = '//input[@id="username"]';
    const password        = '//input[@id="password"]';
    const loginBtn        = '//input[@id="kc-login"]';
    
    //username
    cy.xpath(userName)
      .type(inputUserName)
      .should(have_value,inputUserName); 
    //password
    cy.xpath(password)
      .type(inputPassword)
      .should(have_value,inputPassword);
    //click login
    cy.xpath(loginBtn).click();
})

Cypress.Commands.add('ClickTo',(path)=>{
    cy.xpath(path).click();
})