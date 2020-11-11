import {have_value} from '../../util/commands';
import {address} from '../../util/constant';

describe("ShowDashboard",() => {


    const durationBtn       = '//body/div[@id="root"]/div[1]/div[1]/nav[1]/div[1]/div[1]/div[1]/ul[1]/div[1]/li[3]/button[1]';
    const startDateBox      = '//div[@class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]//div[1]//div[1]//div[1]//div[1]//label[contains(text(),"Start")]';
    const startDate20201104 = '//div[@class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]//div[1]//div[1]//div[1]//div[1]//input[@value="2020/11/04"]';
    const endDateBox        = '//div[@class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]//div[1]//div[2]//div[1]//div[1]/input[1]';
    const yearBox           = '//h6[contains(text(),"20")]';
    const year2020          = '//div[contains(text(),"2020")]';
    const startMonth        = '//p[@class="MuiTypography-root MuiTypography-body1 MuiTypography-alignCenter"]';
    const chooseUpMonth     = '//div[@class="MuiPickersCalendarHeader-switchHeader"]//button[1]';
    const date_4            = '//div[@class="MuiPickersSlideTransition-transitionContainer MuiPickersCalendar-transitionContainer"]//div[1]//div[1]//div[4]';
    const date_10           = '//div[@class="MuiPickersSlideTransition-transitionContainer MuiPickersCalendar-transitionContainer"]//div[1]//div[2]//div[3]';
    const durationSubmit    = '//span[contains(text(),"Submit")]';

    const boardBtn          = '//body/div[@id="root"]/div[1]/div[1]/nav[1]/div[1]/div[1]/div[1]/ul[2]/div[1]';
    const filterBtn         = '//body/div[@id="root"]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/button[1]';

    
    it("Login to the website",()=>{  

        
        const userName        = '//input[@id="username-field"]';
        const password        = '//input[@id="password-field"]';
        const loginBtn        = '//input[@id="login-button"]';

        cy.visit(address);
        //-------------login---------------
        //username
        cy.xpath(userName)
          .type("ssl1321ois")
          .should(have_value,"ssl1321ois"); 
        //password
        cy.xpath(password)
          .type("lab1321bal")
          .should(have_value,"lab1321bal");
        //click login
        cy.xpath(loginBtn).click();
        //----------------------------------
    });

    it("Go to Dashboard",()=>{
        cy.ClickTo(boardBtn);

    });
    
    it("Set Duration",()=>{  

        cy.ClickTo(durationBtn);
        cy.ClickTo(startDateBox);
        cy.ClickTo(yearBox);
        cy.ClickTo(year2020);
        cy.document().then(document =>{
            var j = 0;
            let mon;
            do
            {
                cy.xpath(startMonth).then(($month) => {
                    mon = $month.text();
                    if(mon != 'November 2020'){
                        cy.ClickTo(chooseUpMonth);
                    }
                });
                j++;
            }
            while(j < 12);  
        })
        cy.ClickTo(date_4);
        cy.xpath(startDate20201104)
          .should(have_value,"2020/11/04");

        cy.ClickTo(endDateBox);
        cy.ClickTo(yearBox);
        cy.ClickTo(year2020);
        cy.document().then(document =>{
            var j = 0;
            let mon;
            do
            {
                cy.xpath(startMonth).then(($month) => {
                    mon = $month.text();
                    if(mon != 'November 2020'){
                        cy.ClickTo(chooseUpMonth);
                    }
                });
                j++;
            }
            while(j < 12);  
        })
        cy.ClickTo(date_10);
        cy.xpath(endDateBox)
          .should(have_value,"2020/11/10");
        cy.ClickTo(durationSubmit);

    });

    
    

    // it.skip("Go To History",()=>{
    //     const historyBtn = '//body/div[@id="root"]/div[@class="container"]/div[@class="view"]/nav[@class="makeStyles-drawer-5"]/div[@class="PrivateHiddenCss-xsDown-10"]/div[@class="MuiDrawer-root MuiDrawer-docked"]/div[@class="MuiPaper-root MuiDrawer-paper makeStyles-drawerPaper-7 MuiDrawer-paperAnchorLeft MuiDrawer-paperAnchorDockedLeft MuiPaper-elevation0"]/div/ul[@class="MuiList-root MuiList-padding"]/div[2]';
    //     const historyTable = '//tbody[@class="MuiTableBody-root"]//td[text()="Self Reading"]';
       
    //     //history button
    //     cy.xpath(historyBtn).click();
    //     const durationBtn ='//div[@id="root"]//li[2]//button[1]';
    //     //duration button
    //     cy.xpath(durationBtn).click();
    //     cy.xpath('//span[contains(text(),"Submit")]').click();

    //     //verify title
    //     let index = 0;
    //     for(let i=1;i<6;i++){
    //         //if(cy.xpath('//tr['+ i +']//td[2]'). )
    //         let td = document.evaluate('//tr['+ i +']//td[2]', document, null, XPathResult.ANY_TYPE, null);
    //         if(td.value == "Self Reading"){
    //             index = i;        
    //             cy.xpath('//tr['+ index +']//td[2]')
    //             .should(have_value,"Self Reading");
    //             break;
    //         }

    //         console.log(i);
    //     }
    //     console.log(index);

    //     cy.xpath('//tr['+ index +']//td[2]')
    //       .should(have_value,"Self Reading");

    //     //verify activity type
    //     //cy.xpath(historyTable).
        
        
    //     });
});


