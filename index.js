const fifaData = require('./fifa.js');
//console.log(fifaData);


// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */
//for (let x=0;x<fifaData.length;x++){
 //if( fifaData[x].Year === 2014 && fifaData[x].Stage === "Final")
 //console.log("(a) " + fifaData[x]["Home Team Name"] + ", (b) " + fifaData[x]["Away Team Name"] + ", (c) " + fifaData[x]["Home Team Goals"] + ", (d) " + fifaData[x]["Away Team Goals"] + ", (e) " + fifaData[x]["Win conditions"]);
//}

let finals = fifaData.find(match => match.Stage === "Final" && match.Year === 2014);
let homename = "(a) Home Team Name: " + finals["Home Team Name"] + " /// ";
let awayname = "(b) Away Team Name: " + finals["Away Team Name"] + " /// ";
let homegoals = "(c) Home Team Goals: " + finals["Home Team Goals"] + " /// ";
let awaygoals = "(d) Away Team Goals: " + finals["Away Team Goals"] + " /// ";
console.log(homename +  awayname + homegoals + awaygoals); 
if (finals["Home Team Goals"] > finals["Away Team Goals"]){
    console.log(finals["Home Team Name"]+ " is the winner of the 2014 World Cup Final!!");
    
} else{ console.log;(finals["Away Team Name"] + " is the winner of the 2014 World Cup Final!! \n");
}









/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    return data.filter(match => match.Stage === 'Final')
    
    
    //let finalsdata = []
    //for (let x=0; x < data.length; x++){
       // if (data[x].Stage === "Final"){
          //  finalsdata.push(data[x]);
       // }
   // }
//return finalsdata;
};
getFinals(fifaData);

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(callback, data) {
    let years = [];
  callback(data).map(match=>{
    years.push(match.Year);
   });
   return years;
};
console.log("\nYears of World Cup Finals \n" + getYears(getFinals, fifaData));
    
    //const finalyears = []
   // for (let x = 0 ; x < finals.length ; x++){
     //   finalyears.push(finals[x].Year);
   // }
   // return finalyears;


//};
//console.log(getYears(fifaData));
 //getYears(fifaData);


/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(callback, data) {
   let matches = callback(data);
   let winners1 = [];
   matches.map(match=>{
       if(match["Home Team Goals"] === match["Away Team Goals"]){
           let theWinner = match["Win conditions"].substr(0, match["Win conditions"].indexOf("w"));
           winners1.push(theWinner);
       } else if (match["Home Team Goals"]>match["Away Team Goals"]){
           winners1.push(match["Home Team Name"]);
       } else{
           winners1.push(match["Away Team Name"]);
       }
   });
   return winners1
   
   
   
   
   
   
   // const winners = []
    //for (let x = 0; x < finals2.length; x++){
      //  if(finals2[x]["Home Team Goals"] > finals2[x]["Away Team Goals"]){
        //    winners.push(finals2[x]["Home Team Name"]);
      //  } 
       /// else if (finals2[x]["Home Team Goals"] < finals2[x]["Away Team Goals"]){
          //  winners.push(finals2[x]["Away Team Name"]);
       // } 
       // else if(finals2[x]["Home Team Goals"] === finals2[x]["Away Team Goals"]){
         //   winners.push("nobody");
     //   }
   // }
    
   // return winners;
};
console.log("\nWorld Cup Winners \n" + getWinners(getFinals, fifaData));
getWinners(getFinals, fifaData);

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getAllWinners(callback1, callback2){
    let theWinners = callback1(getFinals, fifaData);
    let years = callback2(getFinals, fifaData);
    let listWinners = [];
    for (let x=0; x < theWinners.length; x++){
        listWinners.push("In " + years[x] + ", " + theWinners[x] + " won the World Cup!");
    }
    return listWinners;
}
console.log(getAllWinners(getWinners, getYears));


//function getWinnersByYear(country, years) {
  //  let worldWinners = []
    //for (let x=0 ; x < years.length; x++){
      // let setup = "In " + years[x] + ", " + country[x] + " won the world cup!"
       //worldWinners.push(setup);
//}
//return worldWinners;



//};
//console.log(getWinnersByYear(getWinners((getFinals(fifaData))),getYears(getFinals((fifaData)))));
//getWinnersByYear(getWinners((getFinals(fifaData))),getYears(getFinals((fifaData))));

/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
let win = data.reduce((acc, match)=>{
    if(match.Stage === "Final"){
        let WinInitials;
        if(match['Home Team Goals'] > match["Away Team Goals"]){
            WinInitials = match["Home Team Name"].substr(0, 3).toUpperCase();
        }else if(match["Home Team Goals"] < match["Away Team Goals"]){
            WinInitials = match["Away Team Name"].substr(0, 3).toUpperCase();
        }else{
            WinInitials = match["Win conditions"].substr(0, 3).toUpperCase();
        }
        if(WinInitials === initials){
            return acc + 1;
        }
    }
    return acc;
},0);
return  initials + " : " + win;

}
console.log(getCountryWins(fifaData, "USA"));

/* Task 8: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {

let HomeTeamAvgGoals = data.reduce((goals, match, index)=>{
    let Counter = index + 1;
    return goals + match["Home Team Goals"] / Counter;
},0);
let AwayTeamAvgGoals = data.reduce((goals, match, index)=>{
    let Counter = index + 1;
    return goals + match["Away Team Goals"] / Counter;
},0);
return{
    HomeTeamAvgGoals,AwayTeamAvgGoals
}

};

console.log(getAverageGoals(fifaData));


/// STRETCH 🥅 //

/* STRETCH 1: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* STRETCH 2: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
