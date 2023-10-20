class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage = function (input) {
      // let roverStatus = {
      //    mode: this.mode,
      //    generatorWatts: this.generatorWatts,
      //    position: this.position
      // };
      // let output = {
      //    message: input.name,
      //    results: [{completed: false}, roverStatus]
      // };
      let results = [];
      let output = {results: results, message: input.name};
         for (let i = 0; i < input.commands.length; i++) {
            if ((input.commands)[i].commandType === "STATUS_CHECK") {
               results.push({
                  completed: true,
                  roverStatus: {
                     mode: this.mode,
                     generatorWatts: this.generatorWatts,
                     position: this.position
                  }
               });
            } else if (input.commands[i].commandType === "MODE_CHANGE") {
               results.push({
                  completed: true,
               });
               this.mode = input.commands[i].value;
            } else if (input.commands[i].commandType === "MOVE") {
               if (this.mode === "LOW_POWER") {
                  results.push({
                     completed: false,
                  })
               } else {
               results.push({
                  completed: true,
               })
               this.position = input.commands[i].value;
               }
            }
         }
      return output;
   }

   }

// if (input.commands[i].commandType === "MOVE") {
//    this.position = input.commands[i].value;
//    output.completed = true;
module.exports = Rover;