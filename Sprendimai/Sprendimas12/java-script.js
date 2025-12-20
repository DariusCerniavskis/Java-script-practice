
// Task12 




const getUserData=(dataName, dataType)=>{
    // Error message initialisation
    let dataError=``;
    let userData;
    while (true){
        userData=prompt(`${dataError}Expense area filling, what is ${dataName}?`,userData); 
 
        if( userData!==null){
            // Check the entered date
             if (isNaN( userData)) {
                // string 
                if (dataType==="string"){
                    // title
                    return userData;
  
                } else{
                    // ID and Cost not string
                    dataError=`${dataName} should be a NUMBER`;
                };

            } else {
                // number or empty
                if(userData.length===0){
                    dataError=`${dataName} should not be EMPTY`;
                
                } else if(dataName==="id"){
                    // ID 1, 2 , 3.....
                    if (userData>0 && userData==Math.round(userData)){
                        // ID
                        return userData;
                    } else {
                        dataError=`${dataName} should be COUNTIBLE and BIGGER than 0`;
                    };
            
                }else if (dataName==="cost"){
                    // cost 0.01 ....
                    if (userData>=0){
                        // price
                        return (Math.round(userData*100)/100).toFixed(2);
                    } else{
                        dataError=`${dataName} should be POSITIVE`;
                    };

                } else {
                    // Tales is not a number
                    dataError=`${dataName} shoild be STRING`;
                };
            };

       
        } else {
            // Stop
             return null;   
        };
        

        // Othervise, show error mesage and repeat
        dataError=`${dataError}, \nCANCEL to exit. `;
 
    };

};

const getExpensesElemnet=()=>{


    const userExpenseTitle=getUserData("Title","string");
     if (userExpenseTitle==null){
        // STOP getting data
        return userExpenseTitle;
    } ;

    const userExpenseID=getUserData("id","number")
        if (userExpenseID==null){
        // STOP getting data
        return userExpenseID;
    };
    
    const userExpenseCost=getUserData("cost","number")
    if (userExpenseCost==null){
        // STOP getting data
        return userExpenseCost;
    }; 
    
    //  All data
    const userExpense={
        title: userExpenseTitle,
        ID: userExpenseID,
        cost: userExpenseCost
    };
    return  userExpense; 

};

// Start position
console.log("Statrtas");

let myExpenses=[];
console.log(`Let's start filling area of our expenses. Press CANCEL to exit.`);


while (true){
    const expensesElement=getExpensesElemnet();

    if (expensesElement == null){
        // STOP
        console.log('STOP')
        console.log(myExpenses)
        break;
    
    } else{
        myExpenses.push(expensesElement);
        console.log(`Lenght of My expenses is: ${myExpenses.length}`)
    }

};

if(typeof myExpenses ==="NaN"){
    console.log(`Our expenses area ir empty.`);
    console.log(`Are you lazy boy (girl)?`);
} else {
    console.log(`Our expenses area consist of ${myExpenses.length} element(s).`);
    console.log(myExpenses);
    console.log(`Exelent work!`);
};

 
  







  




