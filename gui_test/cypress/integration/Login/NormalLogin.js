import {have_value, address} from '../../util/commands.js'

describe("Happy Path", () =>{
    
    const userID = "ssl1321ois";

    it("Login to the website", ()=>{
        const userPassword    = "lab1321bal";

        cy.visit(address);
        
        cy.login(userID, userPassword);
    });

    it("Assert My Profile", () =>{
        const profileBtn = '//nav[@class="makeStyles-drawer-5"]//div[4]';
        const profileName = '//input[@id="name"]';
        
        cy.ClickTo(profileBtn);
        cy.xpath(profileName)
          .should(have_value, userID);
    });
})
