describe("AddLogTask1",() => {
    it("Add a log", () => {
        cy.visit("https://keycloak-beta.hsiang.me/auth/realms/OIS/protocol/openid-connect/auth?client_id=timelog&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fboard&state=7d8c318f-23c4-4734-b3d5-ae1e659e3753&response_mode=fragment&response_type=code&scope=openid&nonce=6e21fa89-2bd7-47a6-86e2-efae2b0812eb&code_challenge=PcQo0ZWndKgtWrn0lcgJg4DzlTh2kPtERN7PjNSf1xA&code_challenge_method=S256");
        

        cy.xpath('//input[@id="username"]')
        .type("ssl1321ois")
        .should("have.value","ssl1321ois"); 

        cy.xpath('//input[@id="password"]')
        .type("lab1321bal")
        .should("have.value","lab1321bal");

        cy.xpath('//input[@id="kc-login"]').click();

        cy.xpath('//div[@id="root"]//li[1]//button[1]').click();
        //cy.get('.PrivateHiddenCss-xsDown-10 > .MuiDrawer-root > .MuiPaper-root > :nth-child(1) > :nth-child(2) > :nth-child(1) > .MuiButtonBase-root').click(10,10);
        //cy.xpath('//div[@class="MuiPaper-root MuiDrawer-paper jss7 MuiDrawer-paperAnchorLeft MuiDrawer-paperAnchorDockedLeft MuiPaper-elevation0"]//div//span[@class="MuiButton-label"][contains(text(),"Add Log")]').click(1,1);
        
        cy.xpath('//input[@id="title"]')
        .type("Self Reading")
        .should("have.value","Self Reading");

        cy.xpath('//div[@id="activity-type-select"]').click();

        cy.xpath('//li[contains(text(),"LabProject")]').click();
     



    });
});