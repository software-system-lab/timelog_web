const have_value = "have.value";

//Cancel
describe("AddActivityTask9",() => {
    const inputActivityType = 'D B';

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

    it("Add Activity Type/Cancel",() => {
        const activityTypeXPath = '//input[@placeholder="Activity Type"]';
        const cancelBtn = '//body//button[2]';
        cy.xpath(activityTypeXPath)
          .type(inputActivityType)
          .should(have_value,inputActivityType);
        cy.ClickTo(cancelBtn);
    });

    it("Search Activity Type",() => {
        const searchBox = '//input[@placeholder="Search"]';

        cy.xpath(searchBox)
          .type(inputActivityType)
          .should(have_value,inputActivityType);
    })

    it("Assert Activity Type",() => {
        const feedback = '//td[@class="MuiTableCell-root MuiTableCell-body"]';

        cy.xpath(feedback).should(($el) => {
            expect($el).to.contain('No records to display');
        });
    })
});
