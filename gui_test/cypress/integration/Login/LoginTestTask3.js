const have_value = "have.value";

describe("LoginTestTask1", () =>{
    it("Login to the website",()=>{
        const userID          = "ssl1321ois";
        const userName        = '//input[@id="username"]';
        const loginBtn        = '//input[@id="kc-login"]';

        cy.visit("https://keycloak-beta.hsiang.me/auth/realms/OIS/protocol/openid-connect/auth?client_id=timelog&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=767eb54d-bccd-4fa2-8cca-2379befcb658&response_mode=fragment&response_type=code&scope=openid&nonce=d01888f5-cf4f-4dd5-8d24-d095b6d254e0&code_challenge=tMRafhLcHYLVT8oep70S8eHvp9-eB548bB4Cl9OeZvg&code_challenge_method=S256");
        
        //username
        cy.xpath(userName)
         .type(userID)
         .should(have_value,userID); 
        
         //click login
        cy.xpath(loginBtn).click();
    });

    it("Assert Feedback",() =>{
        const feedbackPath    = '//span[@class="kc-feedback-text"]';

        cy.xpath(feedbackPath).should(($el) =>{
            expect($el).to.have.text("Invalid username or password.");
        });
    });
    
})