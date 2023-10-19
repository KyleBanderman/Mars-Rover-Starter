class Message {
   constructor(name, commands) {
      this.name = name;
      if (!this.name) {
         throw Error ("ERROR! No name given.")
      }
      this.commands = commands;
   }
}
let fillerArray = [];
console.log(fillerArray, typeof fillerArray);
module.exports = Message;