describe("Add an activity without checking private and enable", () => {

    cy.visit("https://ssl-drone.csie.ntut.edu.tw/?redirect_url%3Dhttps%3A%2F%2Fssl-timelog.csie.ntut.edu.tw%2F")

    it("Login to the website", ()=>{
        const userID          = "ssl1321ois";
        const userPassword    = "lab1321bal";

        cy.visit(address);
        cy.
        cy.login(userID, userPassword);
    });
});