import {have_value} from '../../util/commands';
import {address, invalid_login} from '../../util/constant';

describe("Empty Password", () =>{
    it("Login to the website", ()=>{
        const userID          = "ssl1321ois";
        const userName        = '//input[@id="username"]';
        const loginBtn        = '//input[@id="kc-login"]';

        cy.visit(address);
        //username
        cy.xpath(userName)
         .type(userID)
         .should(have_value, userID); 
         //click login
         cy.ClickTo(loginBtn);
    });

    it("Assert Feedback", () =>{
        const feedbackPath    = '//span[@class="kc-feedback-text"]';

        cy.xpath(feedbackPath).should(($el) =>{
            expect($el).to.have.text(invalid_login);
        });
    });
    
})
