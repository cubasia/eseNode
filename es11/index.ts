function luckyDraw2(player:string) {
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

function agetResults(Players: string[]){
    Players.forEach(async (player) => {
        
        const Resplayer = await luckyDraw2(player)
            .catch(error => console.log(error.message))
            .finally(() => {})
        if (Resplayer) console.log(Resplayer)

        // try {
        //     const Resplayer = await luckyDraw2(player);
        //     console.log(Resplayer);
            
        // } catch (error:any) {
        //     console.log(error.message);
        // }
        
    })
    
}

agetResults(["Tina","Jorge","julien"])
