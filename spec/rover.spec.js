const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

    test("constructor sets position and default values for mode and generatorWatts", function () {
        let output = new Rover(1);
        expect(output.position).toBe(1);
        expect(output.mode).toBe("NORMAL");
        expect(output.generatorWatts).toBe(110)
  });

    test("response returned by receiveMessage contains the name of the message", function () {
        let output = new Rover(1);
        let message = new Message("bing bong", [new Command("MOVE", 1), new Command("MOVE", 1)]);
        expect(output.receiveMessage(message).message).toBe("bing bong");
    });

    test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
        let output = new Rover(1);
        let message = new Message("bing bong", [new Command("MOVE", 1), new Command("MOVE", 1)]);
        expect(output.receiveMessage(message).results.length).toBe(2);
    });

    test("responds correctly to the status check command", function () {
        let output = new Rover(1);
        let message = new Message("bing bong", [new Command("STATUS_CHECK"), new Command("MOVE", 1)]);
        expect(output.receiveMessage(message).results[0].completed).toBe(true);
        expect(output.receiveMessage(message).results[0].roverStatus.mode).toBe("NORMAL");
        expect(output.receiveMessage(message).results[0].roverStatus.generatorWatts).toBe(110);
        expect(output.receiveMessage(message).results[0].roverStatus.position).toBe(1);
    });

    test("responds correctly to the mode change command", function () {
        let output = new Rover(1);
        let output2 = new Rover(1);
        let message = new Message("bing bong", [new Command("MODE_CHANGE", "LOW_POWER")]);
        let message2 = new Message("bing bong", [new Command("MODE_CHANGE", "LOW_POWER")]);
        output2.receiveMessage(message2)
        expect(output.receiveMessage(message).results[0].completed).toBe(true);
        expect(output2.mode).toBe("LOW_POWER");
    });

    test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
        let output = new Rover(1);
        let message = new Message("bing bong", [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 2)]);
        expect(output.receiveMessage(message).results[1].completed).toBe(false);
        expect(output.position).toBe(1);
    });

    test("responds with the position for the move command", function () {
        let output = new Rover(1);
        let message = new Message("bing bong", [new Command("MOVE", 2)]);
        output.receiveMessage(message);
        expect(output.position).toBe(2);
    });
});