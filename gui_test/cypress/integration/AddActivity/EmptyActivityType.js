import {address} from '../../util/commands';

//Empty Activity Type
describe("Empty Activity Type", () => {
    const inputActivityType = 'DB';

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

    it("Add Activity Type", () => {
        const saveBtn = '//tr[@class="MuiTableRow-root"]//button[1]';
        cy.ClickTo(saveBtn);

    });

    it("Assert Activity Type", () => {
        cy.on('window:alert', (str)=>{
            expect(str).to.equal('Add activity type failed')
        });
    });
});
