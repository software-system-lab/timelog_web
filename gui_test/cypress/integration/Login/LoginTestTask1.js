const have_value = "have.value";

describe("LoginTestTask1", () =>{
    const userID = "ssl1321ois";

    it("Login to the website",()=>{
        const userPassword    = "lab1321bal";

        cy.visit("https://keycloak-beta.hsiang.me/auth/realms/OIS/protocol/openid-connect/auth?client_id=timelog&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=767eb54d-bccd-4fa2-8cca-2379befcb658&response_mode=fragment&response_type=code&scope=openid&nonce=d01888f5-cf4f-4dd5-8d24-d095b6d254e0&code_challenge=tMRafhLcHYLVT8oep70S8eHvp9-eB548bB4Cl9OeZvg&code_challenge_method=S256");
        
        cy.login(userID,userPassword);
    });

    it("Assert My Profile",() =>{
        const profileBtn = '//nav[@class="makeStyles-drawer-5"]//div[4]';
        const profileName = '//input[@id="name"]';
        
        cy.ClickTo(profileBtn);
        cy.xpath(profileName)
          .should(have_value,userID);
    });
})