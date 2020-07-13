const have_value = "have.value";

//Enable/Private Checked
describe("AddActivityTask5",() => {
    const inputActivityType = 'DB';

    it("Login to the website",()=>{

        const userID          = "ssl1321ois";
        const userPassword    = "lab1321bal";

        cy.visit("https://keycloak-beta.hsiang.me/auth/realms/OIS/protocol/openid-connect/auth?client_id=timelog&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=767eb54d-bccd-4fa2-8cca-2379befcb658&response_mode=fragment&response_type=code&scope=openid&nonce=d01888f5-cf4f-4dd5-8d24-d095b6d254e0&code_challenge=tMRafhLcHYLVT8oep70S8eHvp9-eB548bB4Cl9OeZvg&code_challenge_method=S256");
        
        cy.login(userID,userPassword);
    });

    it("Press Activity Button",() => {
        const activityBtn = '//nav[@class="makeStyles-drawer-5"]//div[3]';
        cy.ClickTo(activityBtn);
    });

    it("Press Add Button",() => {
        const addBtn = '//div[@class="MTableToolbar-actions-30"]//div//div//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"]';
        cy.ClickTo(addBtn);
    });

    it("Add Activity Type",() => {
        const activityTypeXPath = '//input[@placeholder="Activity Type"]';
        const saveBtn = '//tr[@class="MuiTableRow-root"]//button[1]';
        const privateCheckBox = '//td[3]//span[1]//span[1]//input[1]';
        const enableCheckBox = '//td[4]//span[1]//span[1]//input[1]';
        cy.xpath(activityTypeXPath)
          .type(inputActivityType)
          .should(have_value,inputActivityType);
        cy.ClickTo(privateCheckBox);
        cy.ClickTo(enableCheckBox);
        cy.ClickTo(saveBtn);
    });

    it("Search Activity Type",() => {
        const searchBox = '//input[@placeholder="Search"]';

        cy.xpath(searchBox)
          .type(inputActivityType)
          .should(have_value,inputActivityType);
    })

    it("Assert Activity Type",() => {
        const activityBox = '//body//tr[1]//td[2]';
        const privateBox = '//body//tr[1]//td[3]';
        const enableBox = '//body//tr[1]//td[4]';

        cy.xpath(activityBox).should(($el) => {
            expect($el).to.contain(inputActivityType);
        })
        
        cy.xpath(privateBox).should('have.attr','value').and('equal','true');
        cy.xpath(enableBox).should('have.attr','value').and('equal','true');
    })

    it("Confirm Activity type in Add Log Box",() => {
        const addLogBtn       = '//div[@id="root"]//li[1]//button[1]';
        const activityType    = '//div[@id="activity-type-select"]';
        const activityList    = '//li[contains(text(),"' + inputActivityType + '")]';
        const cancelBtn       = '//button[@class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textSecondary"]';
        cy.ClickTo(addLogBtn);
        cy.ClickTo(activityType);
        cy.xpath(activityList).should('have.text',inputActivityType);
        cy.ClickTo(activityList);
        cy.ClickTo(cancelBtn);
    })

    it("TearDown",() => {
        const deleteBtn = '//body//tr[1]//button[2]';
        const saveBtn = '//div[@class="Component-horizontalScrollContainer-34"]//button[1]';
        cy.ClickTo(deleteBtn);
        cy.ClickTo(saveBtn);
    })
});
