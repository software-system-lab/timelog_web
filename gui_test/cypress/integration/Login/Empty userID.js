import {have_value, address} from '../../util/commands.js'

describe("Empty userID", () =>{

    it("Login to the website", ()=>{
        const userPassword    = "lab1321bal";
        const password        = '//input[@id="password"]';
        const loginBtn        = '//input[@id="kc-login"]';

        cy.visit(address);
        
        //password
        cy.xpath(password)
          .type(userPassword)
          .should(have_value, userPassword);

        //click login
        cy.ClickTo(loginBtn);
    });

    it("Assert Feedback", () =>{
        const feedbackPath    = '//span[@class="kc-feedback-text"]';

        cy.xpath(feedbackPath).should(($el) =>{
            expect($el).to.have.text("Invalid username or password.");
        });
    });
    
})