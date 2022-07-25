 //Challenge 1:
//
// Use 2 different techniques to output the value of this variable with
// a label, so we can easily identify it in the script output.

const surprisingFact = "The bumblebee bat is the world's smallest mammal";

const label_surprise = "Label Surprise"
console.log(label_surprise + ":"+ surprisingFact);
console.log(`${label_surprise}:${surprisingFact}`);

// Challenge 2:
//
// Use 2 different techniques to output a formatted version
// of this complete object.

interface Person {
    name: string;
    children?: Array<Person>
}
const familyTree:Person[] = [
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



function printPerson(persons: Person[]): void { 

    persons.forEach(persona =>
    {
        console.log(persona.name)
        if (persona.children) {
            console.log("has children: " )
          printPerson(persona.children);
        }
        })
}

function printPerson2(persons: Person[],pad:number): void {
  persons.forEach((persona) => {
    console.log(persona.name.padStart(pad+persona.name.length,' '));
    if (persona.children) {
      console.log("has children:".padStart(pad+13,' '));
      printPerson2(persona.children,pad+5);
    }
  });
}

printPerson(familyTree)
printPerson2(familyTree, 1)

// Challenge 3:
//
// Output a count value every time the importantTask function is called.
// Reset the count value after 4 function calls.
let count =0
function importantTask() {
    count != 4 ? count++ : count = 0
    console.log(count);
}

importantTask();
importantTask();
importantTask();
importantTask();
importantTask();
importantTask();