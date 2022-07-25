"use strict";
//Challenge 1:
//
// Use 2 different techniques to output the value of this variable with
// a label, so we can easily identify it in the script output.
const surprisingFact = "The bumblebee bat is the world's smallest mammal";
const label_surprise = "Label Surprise";
console.log(label_surprise + ":" + surprisingFact);
console.log(`${label_surprise}:${surprisingFact}`);
const familyTree = [
    {
        name: "Person 1",
        children: [
            {
                name: "Person 2",
                children: [
                    {
                        name: "Person 3",
                        children: [
                            {
                                name: "Person 4",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
function printPerson(persons) {
    persons.forEach(persona => {
        console.log(persona.name);
        if (persona.children) {
            console.log("has children: ");
            printPerson(persona.children);
        }
    });
}
function printPerson2(persons, pad) {
    persons.forEach((persona) => {
        console.log(persona.name.padStart(pad + persona.name.length, ' '));
        if (persona.children) {
            console.log("has children:".padStart(pad + 13, ' '));
            printPerson2(persona.children, pad + 5);
        }
    });
}
printPerson(familyTree);
printPerson2(familyTree, 1);
// Challenge 3:
//
// Output a count value every time the importantTask function is called.
// Reset the count value after 4 function calls.
let count = 0;
function importantTask() {
    count != 4 ? count++ : count = 0;
    console.log(count);
}
importantTask();
importantTask();
importantTask();
importantTask();
importantTask();
importantTask();
