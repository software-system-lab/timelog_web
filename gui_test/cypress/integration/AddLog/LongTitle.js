import {have_value, address} from '../../util/commands';

//Long Title
describe("Long Title",() => {

    const hourAM          = '//span[@class="MuiButton-label"]/h6[text()="AM"]';
    const hourPM          = '//span[@class="MuiButton-label"]/h6[text()="PM"]';
    const clock           = '//div[@class="MuiPickersClock-squareMask"]';
    const date_1          = '//button[@class="MuiButtonBase-root MuiIconButton-root MuiPickersDay-day"]//p[(text()="1")]';
    const YearBtn         = '//div[@class="MuiToolbar-root MuiToolbar-regular MuiPickersToolbar-toolbar MuiPickersDatePickerRoot-toolbar MuiToolbar-gutters"]//button[1]//span[1]';
    const chooseUpMonth   = '//div[@class="MuiPickersCalendarHeader-switchHeader"]//button[1]';
    
    it.skip("Login to the website",()=>{

        const userID          = "ssl1321ois";
        const userPassword    = "lab1321bal";

        cy.visit(address);
        
        cy.login(userID,userPassword);
    });

    it.skip("Press add log button",()=>{
        const addLogBtn       = '//div[@id="root"]//li[1]//button[1]';
        //add log button
        cy.ClickTo(addLogBtn);
    });

    it.skip("Add title",()=>{
        const title           = '//input[@id="title"]';
        //title
        cy.xpath(title)
          .type("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSelf Reading")
          .should(have_value,"SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSelf Reading");
    });

    it.skip("Add activity type",()=>{
        const activityType    = '//div[@id="activity-type-select"]';
        const labProject      = '//li[contains(text(),"LabProject")]';
    
        //activity type
        cy.ClickTo(activityType);
        cy.ClickTo(labProject);
        cy.xpath(activityType).should(($div)=>{
            expect($div).to.have.text('LabProject')
        });
    });

    it.skip("Select start date",()=>{
        const startDateBox    = '//div[@class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded"]//div[1]//div[1]//div[1]//div[1]//input[1]';
        const startYear       = '//div[contains(text(),"2019")]';
        const startMonth      = '//p[@class="MuiTypography-root MuiTypography-body1 MuiTypography-alignCenter"]'
        
        cy.ClickTo(startDateBox);
        
        //start year
        cy.ClickTo(YearBtn);
        cy.ClickTo(startYear);
        //start Month

        cy.document().then(document =>{
            var j = 0;
            let mon;
            do
            {
                cy.xpath(startMonth).then(($month) => {
                    mon = $month.text();
                    if(mon != 'May 2019'){
                        cy.ClickTo(chooseUpMonth);
                    }
                });
                j++;
            }
            while(j < 12);  
        })
        //start date
        cy.ClickTo(date_1);
        cy.xpath(startDateBox)
          .should(have_value,"2019/05/01");
    });

    it.skip("Select start time",()=>{
        const startTimeBox    = '//div[@class="MuiDialogContent-root"]//div[2]//div[1]//div[1]//div[1]//input[1]';
    
        //start time
        cy.ClickTo(startTimeBox);
        //AM
        cy.ClickTo(hourAM);
        //9
        cy.xpath(clock).click(10,130);
        //00
        cy.xpath(clock).click(130,10);
        cy.xpath(startTimeBox)
          .should(have_value,"09:00 AM");
    });
    
    it.skip("Select end date",()=>{
        const endDateBox      = '//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]//div[3]//div[1]//div[1]//div[1]//input[1]';
        
        //end date
        cy.ClickTo(endDateBox);
        cy.ClickTo(date_1);
        cy.xpath(endDateBox)
          .should(have_value,"2020/07/01");
    });
    
    it.skip("Select end time",()=>{
        const endTimeBox      = '//div[4]//div[1]//div[1]//div[1]//input[1]';
    
        //end time
        cy.ClickTo(endTimeBox);
        //PM
        cy.ClickTo(hourPM);
        //12
        cy.xpath(clock).click(130,10);
        //00
        cy.xpath(clock).click(130,10);
        cy.xpath(endTimeBox)
          .should(have_value,"12:00 PM");
    });

    it.skip("Add description",()=>{
        const description     = '//input[@id="description"]';

        //desc
        cy.xpath(description)
          .type("Haaaaaaaaaaa")
          .should(have_value,"Haaaaaaaaaaa"); 
    });

    it.skip("Press Submit Button and Get Alert",()=>{
        const submitBtn       = '//span[contains(text(),"Submit")]';

        //submit
        cy.ClickTo(submitBtn);

        //alert box
        cy.on('window:alert',(str)=>{
            expect(str).to.equal('Title should not be empty.')
        });
    });
});
