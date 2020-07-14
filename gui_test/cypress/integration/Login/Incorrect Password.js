import {address} from '../../util/commands.js'

describe("Incorrect Password", () =>{
    
    it("Login to the website", ()=>{
        const userID          = "ssl1321ois";
        const userPassword    = "321cba";

        cy.visit(address);
        
        cy.login(userID, userPassword);
    });

    it("Assert Feedback", () =>{
        const feedbackPath    = '//span[@class="kc-feedback-text"]';

        cy.xpath(feedbackPath).should(($el) =>{
            expect($el).to.have.text("Invalid username or password.");
        });
    });
})