
// const taskNumber = Number(prompt(`Task number?`,8));
const taskNumber=8;
// Task1
if (taskNumber===1){

    const expense = {month:'January'};
 
    console.log(expense);

// Task2
}else if(taskNumber===2){

    expense={
        title:"Food",
        cost: 25,
        id:Math.floor( Math.random()*1000)+1
    };
    console.log(expense.title)

// Task3
}else if (taskNumber===3){
    expense={
        title:"Food",
        cost: 25,
        id:Math.floor( Math.random()*1000)+1
    };
    console.log(expense);

// Task4
}else if(taskNumber===4){
    const expenses=[]

    console.log(expenses)

// Task5    
}else if(taskNumber===5){
    const expenses=[
        "food",
        "course",
        "Christmas gifts",
        "communal fees",
        "school",
    ]

    console.log(expenses)


// Task6   
}else if(taskNumber===6){
    const expenses=[
        "food",
        "course",
        "Christmas gifts",
        "communal fees",
        "school"
    ]

    console.log(expenses[1])

// Task7   
}else if(taskNumber===7){
    const expenses=[
        "food",
        "course",
        "Christmas gifts",
        "communal fees",
        "school"
    ]

    console.log(expenses[expenses.length-1])

 
// Task8  
}else if(taskNumber===8){
    const getExpenses =(currentExpenses,expenseObject)=>{

         currentExpenses.push(expenseObject);
         return currentExpenses;

    }
    
    const randomExpense={};
    const constantTitles=[
        "food",
        "course",
        "Christmas gifts",
        "communal fees",
        "school"
    ];
    let myExpenses=[];

 


    for(let i=0;i<100;i++){
        // create random expense
  
        const randomExpense={
            title:constantTitles[ Math.floor(Math.random()* (constantTitles.length))],
            cost:  (Math.round( (Math.random()* 500)*100)/100).toFixed(2),
            id: Math.floor( Math.random()*1000)+1,
              
        };

 
        myExpenses=getExpenses(myExpenses,randomExpense);
    };

 

    console.log(`My 10 random expenses are:`);
    console.log(myExpenses);
}





