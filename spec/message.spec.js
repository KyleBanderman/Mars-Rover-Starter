const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect( function() { new Message();}).toThrow(new Error('ERROR! No name given.'));
    });

    test("constructor correctly sets name", function () {
        let variable = new Message("bing bong");
        expect(variable.name).toBe("bing bong");
    });

    test("contains a commands array passed into the constructor as the 2nd argument", function () {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let output = new Message("bing bong", commands);
        expect(output.commands[1].commandType).toBe("STATUS_CHECK")
    });
});
