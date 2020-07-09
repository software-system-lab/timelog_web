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
        
        //start date
        cy.xpath('//body/div[@class="MuiDialog-root"]/div[@class="MuiDialog-container MuiDialog-scrollPaper"]/div[@class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]/div[@class="MuiDialogContent-root"]/form/div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]/div[1]/div[1]/div[1]').click();
        cy.xpath('//div[@class="MuiPickersSlideTransition-transitionContainer MuiPickersCalendar-transitionContainer"]//div[2]//div[3]//button[1]').click();
        
        //start time
        cy.xpath('//div[@class="MuiDialogContent-root"]//div[2]//div[1]//div[1]//div[1]//input[1]').click();
        cy.xpath('//h6[@class="MuiTypography-root MuiPickersToolbarText-toolbarTxt MuiPickersTimePickerToolbar-ampmLabel MuiPickersToolbarText-toolbarBtnSelected MuiTypography-subtitle1"]').click();
        
        cy.xpath('//div[@class="MuiPickersClock-clock"]').click();
        
        cy.xpath('//span[contains(text(),"9")]').click();
        cy.xpath('//span[contains(text(),"00")]').click();
        
        //end date
        cy.xpath('//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]//div[3]//div[1]//div[1]//div[1]//input[1]').click();
        cy.xpath('//button[@class="MuiButtonBase-root MuiIconButton-root MuiPickersDay-day"]//p[@class="MuiTypography-root MuiTypography-body2 MuiTypography-colorInherit"][contains(text(),"7")]').click();
       
       //end time
        cy.xpath('//div[4]//div[1]//div[1]//div[1]//input[1]').click();
        cy.xpath('//h6[@class="MuiTypography-root MuiPickersToolbarText-toolbarTxt MuiPickersTimePickerToolbar-ampmLabel MuiTypography-subtitle1"]').click();
        cy.xpath('//span[contains(text(),"12")]').click();
        cy.xpath('//span[contains(text(),"00")]').click();
        
        //desc
        cy.xpath('//input[@id="description"]')
        .type("Haaaaaaaaaaa")
        .should("have.value","Haaaaaaaaaaa"); 

        //submit
        cy.xpath('//span[contains(text(),"Submit")]').click();
        
     



    });
});