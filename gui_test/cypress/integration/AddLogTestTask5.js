//Long Title
describe("AddLogTask5",() => {
    it("Login to the website",()=>{
        cy.visit("https://keycloak-beta.hsiang.me/auth/realms/OIS/protocol/openid-connect/auth?client_id=timelog&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=767eb54d-bccd-4fa2-8cca-2379befcb658&response_mode=fragment&response_type=code&scope=openid&nonce=d01888f5-cf4f-4dd5-8d24-d095b6d254e0&code_challenge=tMRafhLcHYLVT8oep70S8eHvp9-eB548bB4Cl9OeZvg&code_challenge_method=S256");
        //-------------login---------------
        //username
        cy.xpath('//input[@id="username"]')
        .type("ssl1321ois")
        .should("have.value","ssl1321ois"); 
        //password
        cy.xpath('//input[@id="password"]')
        .type("lab1321bal")
        .should("have.value","lab1321bal");
        //click login
        cy.xpath('//input[@id="kc-login"]').click();
        //----------------------------------
    });

    it("Press add log button",()=>{
        //add log button
        cy.xpath('//div[@id="root"]//li[1]//button[1]').click();
    });

    it("Add title",()=>{
        //title
        cy.xpath('//input[@id="title"]')
        .type("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSelf Reading")
        .should("have.value","SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSelf Reading");
        cy.wait(5000);
    });

    it("Add activity type",()=>{
        //activity type
        cy.xpath('//div[@id="activity-type-select"]').click();
        cy.xpath('//li[contains(text(),"LabProject")]').click();
        cy.xpath('//div[@id="activity-type-select"]').should(($div)=>{
            expect($div).to.have.text('LabProject')
        });
    });

    it("Select start date",()=>{
        //start date
        cy.xpath('//body/div[@class="MuiDialog-root"]/div[@class="MuiDialog-container MuiDialog-scrollPaper"]/div[@class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]/div[@class="MuiDialogContent-root"]/form/div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]/div[1]/div[1]/div[1]').click();
        cy.xpath('//div[@class="MuiPickersSlideTransition-transitionContainer MuiPickersCalendar-transitionContainer"]//div[2]//div[3]//button[1]').click();
        cy.xpath('//div[@class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]//div[1]//div[1]//div[1]//div[1]//input[1]')
        .should("have.value","2020/07/07");
    });

    it("Select start time",()=>{
        //start time
        cy.xpath('//div[@class="MuiDialogContent-root"]//div[2]//div[1]//div[1]//div[1]//input[1]').click();
        cy.xpath('//h6[@class="MuiTypography-root MuiPickersToolbarText-toolbarTxt MuiPickersTimePickerToolbar-ampmLabel MuiPickersToolbarText-toolbarBtnSelected MuiTypography-subtitle1"]').click();
        //9
        cy.xpath('//div[@class="MuiPickersClock-squareMask"]').click(10,130);
        //00
        cy.xpath('//div[@class="MuiPickersClock-squareMask"]').click(130,10);
        cy.xpath('//div[@class="MuiDialogContent-root"]//div[2]//div[1]//div[1]//div[1]//input[1]')
        .should("have.value","09:00 AM");
    });
    
    it("Select end date",()=>{
        //end date
        cy.xpath('//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]//div[3]//div[1]//div[1]//div[1]//input[1]').click();
        cy.xpath('//div[@class="MuiPickersSlideTransition-transitionContainer MuiPickersCalendar-transitionContainer"]//div[2]//div[3]//button[1]').click();
        cy.xpath('//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]//div[3]//div[1]//div[1]//div[1]//input[1]')
        .should("have.value","2020/07/07");
    });
    
    it("Select end time",()=>{
        //end time
        cy.xpath('//div[4]//div[1]//div[1]//div[1]//input[1]').click();
        cy.xpath('//h6[@class="MuiTypography-root MuiPickersToolbarText-toolbarTxt MuiPickersTimePickerToolbar-ampmLabel MuiTypography-subtitle1"]').click();
        //12
        cy.xpath('//div[@class="MuiPickersClock-squareMask"]').click(130,10);
        //00
        cy.xpath('//div[@class="MuiPickersClock-squareMask"]').click(130,10);
        cy.xpath('//div[4]//div[1]//div[1]//div[1]//input[1]')
        .should("have.value","12:00 PM");
    });

    it("Add description",()=>{
        //desc
        cy.xpath('//input[@id="description"]')
        .type("Haaaaaaaaaaa")
        .should("have.value","Haaaaaaaaaaa"); 
    });

    it("Press Submit Button",()=>{
        //submit
        cy.xpath('//span[contains(text(),"Submit")]').click();

        /*
        //alert box
        cy.on('window:alert',(str)=>{
            expect(str).to.equal('Activity Type is not selected.')
        });
        */
    });
});
