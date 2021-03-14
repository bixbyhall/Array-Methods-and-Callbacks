import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
// function collectGames(year) {
//     const yearArr = [];
//     for (let i = 0; i < fifaData.length; i++) {
//         if (fifaData[i].Year === year) {
//             yearArr.push(fifaData[i]);
//         }
//     }
//     return yearArr;
// }
// const twoKFourteenGames = collectGames(2014);
// function findFinal(games) {
//     for (let i = 0; i < games.length; i++) {
//         if (games[i].Stage === 'Final') {
//             return games[i];
//         }
//         return games[i];
//     }
//     return games[i];
// }

// const twoKFourteenFinals = findFinal(twoKFourteenGames);
// //(a) Home Team name for 2014 world cup final
// console.log(twoKFourteenFinals['Home Team Name']);

// //(b) Away Team name for 2014 world cup final
// console.log(twoKFourteenFinals['Away Team Name']);
// //(c) Home Team goals for 2014 world cup final
// console.log(twoKFourteenFinals['Home Team Goals']);
// //(d) Away Team goals for 2014 world cup final
// console.log(twoKFourteenFinals['Away Team Goals']);
// //(e) Winner of 2014 world cup final */
// if(twoKFourteenFinals['Home Team Goals'] > twoKFourteenFinals['Away Team Goals']) {
//     console.log(twoKFourteenFinals['Home Team Name']);
// } else {
//     console.log(twoKFourteenFinals['Away Team Name']);
// }


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
    const outputArr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].Stage === 'Final') {
            outputArr.push(data[i]);
        }
    }
    return outputArr;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data, callback) {
    const years = [];
    const finalsArr = callback(data);
    for (let i = 0; i < finalsArr.length; i++) {
        years.push(finalsArr[i].Year);
    }
    return years;
}


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(data, callback) {
    const newData = callback(data);
    const winners = [];
    for (let i = 0; i < newData.length; i++) {
        let homeScore = newData[i]['Home Team Goals'];
        let awayScore = newData[i]['Away Team Goals'];
        if (homeScore > awayScore) {
            winners.push(newData[i]['Home Team Name']);
        } else {
            winners.push(newData[i]['Away Team Name']);
        }
    }
    return winners;
}

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, cb1, cb2) {
    const years = cb1(data, getFinals);
    const winners = cb2(data, getFinals);
    const output = [];
    for (let i = 0; i < years.length; i++) {
        output.push(`In ${years[i]}, ${winners[i]} won the world cup!`);
    }
    return output;
}

console.log(getWinnersByYear(fifaData, getYears, getWinners));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(cb) {
    const finals = cb;
    const goals = [];
    for (let i = 0; i < finals.length; i++) {
        goals.push(finals[i]['Home Team Goals']);
        goals.push(finals[i]['Away Team Goals']);
    }
    let goalsTotal = goals.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0)
    return (goalsTotal / (goals.length / 2)).toFixed(2);
}


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getWinner(obj) {
    let output = '';
    if (obj['Home Team Goals'] > obj['Away Team Goals']) {
        output = obj['Home Team Initials'];
            
    } else {
        output = obj['Away Team Initials'];
    }
    return output;
}

function getCountryWins(data, country) {
    let newData = getFinals(data);
    const countryArr = [];
    for (let i = 0; i < newData.length; i++) {
        countryArr.push(getWinner(newData[i]));
    }
    console.log(countryArr);
    return countryArr.reduce((p, c) => {
        if (c === country) {
            p++;
        }
        return p;
    }, 0)
}


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
