import {have_value, have_attr, have_text} from '../../util/commands';
import {address} from '../../util/constant';

//Press Cancel
describe("Press Cancel", () => {
    const inputActivityType = 'WorkOut';

    it("Login to the website", ()=>{
        const userID          = "ssl1321ois";
        const userPassword    = "lab1321bal";

        cy.visit(address);
        cy.login(userID, userPassword);
    });

    it("Press Activity Button", () => {
        const activityBtn = '//nav[@class="makeStyles-drawer-5"]//div[3]';

        cy.ClickTo(activityBtn);
    });

    it("Press Add Button", () => {
        const addBtn = '//div[@class="MTableToolbar-actions-30"]//div//div//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"]';
        
        cy.ClickTo(addBtn);
    });

    it("Add Activity Type/Cancel", () => {
        const activityTypeXPath = '//input[@class="MuiInputBase-input MuiInput-input"]';
        const cancelBtn = '//body//button[2]';
        
        cy.xpath(activityTypeXPath)
          .type(inputActivityType)
          .should(have_value, inputActivityType);
        cy.ClickTo(cancelBtn);
    });

    it("Search Activity Type", () => {
        const searchBox = '//input[@placeholder="Search"]';

        cy.xpath(searchBox)
          .type(inputActivityType)
          .should(have_value, inputActivityType);
    })

    it("Assert Activity Type", () => {
        const feedback = '//td[@class="MuiTableCell-root MuiTableCell-body"]';

        cy.xpath(feedback).should(($el) => {
            expect($el).to.contain('No records to display');
        });
    })
});
