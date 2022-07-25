function luckyDraw(player:string) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}


luckyDraw("JOE")
    .then(result => {
        console.log(result)
    })    

    .catch((error: any) => {
    console.log(error.message)
})
.finally( () => {
    luckyDraw("Caroline")
      .then(result => {
        console.log(result)
        })    
    .catch((error: any) => {
            console.log(error.message)
    })
    .finally( () => {
     luckyDraw("Sabrina")
       .then((result) => {
         console.log(result);
       })
       .catch((error: any) => {
         console.log(error.message);
       })
       .finally(() => {console.log("all done");});
        
    })
})


      
    

    
    
