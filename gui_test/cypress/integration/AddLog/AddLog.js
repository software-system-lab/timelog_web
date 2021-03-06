import {have_value, address} from '../../util/commands';

describe("AddLog",() => {

    const addLogBtn       = '//div[@id="root"]//li[1]//button[1]';
    const title           = '//input[@id="title"]';
    const activityType    = '//div[@id="activity-type-select"]';
    const labProject      = '//li[contains(text(),"LabProject")]';
    const startDateBox    = '//div[@class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]//div[1]//div[1]//div[1]//div[1]//input[1]';
    const startTimeBox    = '//div[@class="MuiDialogContent-root"]//div[2]//div[1]//div[1]//div[1]//input[1]';
    const endDateBox      = '//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]//div[3]//div[1]//div[1]//div[1]//input[1]';
    const endTimeBox      = '//div[4]//div[1]//div[1]//div[1]//input[1]';
    const date_7          = '//div[@class="MuiPickersSlideTransition-transitionContainer MuiPickersCalendar-transitionContainer"]//div[2]//div[3]//button[1]';
    const hourAM          = '//span[@class="MuiButton-label"]/h6[text()="AM"]';
    const hourPM          = '//span[@class="MuiButton-label"]/h6[text()="PM"]';
    const clock           = '//div[@class="MuiPickersClock-squareMask"]';
    const description     = '//input[@id="description"]';
    const submitBtn       = '//span[contains(text(),"Submit")]';


    
    it.skip("Login to the website",()=>{  

        
        const userName        = '//input[@id="username"]';
        const password        = '//input[@id="password"]';
        const loginBtn        = '//input[@id="kc-login"]';

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
    
/*
    it.skip("Set duration",()=>{
        const durationBtn ='//div[@id="root"]//li[2]//button[1]';
        //duration button
        cy.xpath(durationBtn).click();
        cy.xpath('//span[contains(text(),"Submit")]').click();
    //});
*/

 /*
    it.skip("Press add log button",()=>{
        //add log button
        cy.xpath(addLogBtn).click();
    });

    it.skip("Add title",()=>{
        //title
        cy.xpath(title)
          .type("Self Reading")
          .should(have_value,"Self Reading");
    });

    it.skip("Add activity type",()=>{
        //activity type
        cy.xpath(activityType).click();
        cy.xpath(labProject).click();
        cy.xpath(activityType).should(($div)=>{
            expect($div).to.have.text('LabProject')
        });
    });

    it.skip("Select start date",()=>{
        //start date
        cy.xpath(startDateBox).click();
        cy.xpath(date_7).click();
        cy.xpath(startDateBox)
          .should(have_value,"2020/07/07");
    });

    it.skip("Select start time",()=>{
        //start time
        cy.xpath(startTimeBox).click();
        //AM
        cy.xpath(hourAM).click();
        //9
        cy.xpath(clock).click(10,130);
        //00
        cy.xpath(clock).click(130,10);
        cy.xpath(startTimeBox)
          .should(have_value,"09:00 AM");
    });
    
    it.skip("Select end date",()=>{
        //end date
        cy.xpath(endDateBox).click();
        cy.xpath(date_7).click();
        cy.xpath(endDateBox)
        .should(have_value,"2020/07/07");
    });
    
    it.skip("Select end time",()=>{
        //end time
        cy.xpath(endTimeBox).click();
        //PM
        cy.xpath(hourPM).click();
        //12
        cy.xpath(clock).click(130,10);
        //00
        cy.xpath(clock).click(130,10);
        cy.xpath(endTimeBox)
          .should(have_value,"12:00 PM");
    });

    it.skip("Add description",()=>{
        //desc
        cy.xpath(description)
          .type("Haaaaaaaaaaa")
          .should(have_value,"Haaaaaaaaaaa"); 
    });

    it.skip("Press Submit Button",()=>{
        //submit
        cy.xpath(submitBtn).click();
    });
    

    it.skip("Set duration",()=>{
        const durationBtn ='//div[@id="root"]//li[2]//button[1]';
        //duration button
        cy.xpath(durationBtn).click();
        cy.xpath('//span[contains(text(),"Submit")]').click();
    }); 
    */   

    it.skip("Go To History",()=>{
        const historyBtn = '//body/div[@id="root"]/div[@class="container"]/div[@class="view"]/nav[@class="makeStyles-drawer-5"]/div[@class="PrivateHiddenCss-xsDown-10"]/div[@class="MuiDrawer-root MuiDrawer-docked"]/div[@class="MuiPaper-root MuiDrawer-paper makeStyles-drawerPaper-7 MuiDrawer-paperAnchorLeft MuiDrawer-paperAnchorDockedLeft MuiPaper-elevation0"]/div/ul[@class="MuiList-root MuiList-padding"]/div[2]';
        const historyTable = '//tbody[@class="MuiTableBody-root"]//td[text()="Self Reading"]';
       
        //history button
        cy.xpath(historyBtn).click();
        const durationBtn ='//div[@id="root"]//li[2]//button[1]';
        //duration button
        cy.xpath(durationBtn).click();
        cy.xpath('//span[contains(text(),"Submit")]').click();

        //verify title
        let index = 0;
        for(let i=1;i<6;i++){
            //if(cy.xpath('//tr['+ i +']//td[2]'). )
            let td = document.evaluate('//tr['+ i +']//td[2]', document, null, XPathResult.ANY_TYPE, null);
            if(td.value == "Self Reading"){
                index = i;        
                cy.xpath('//tr['+ index +']//td[2]')
                .should(have_value,"Self Reading");
                break;
            }

            console.log(i);
        }
        console.log(index);

        cy.xpath('//tr['+ index +']//td[2]')
          .should(have_value,"Self Reading");

        //verify activity type
        //cy.xpath(historyTable).
        
        
        });
});


