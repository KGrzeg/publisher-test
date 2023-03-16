const Publisher = require("./publisher");

describe("Publisher", () => {
  let instance;

  beforeEach(() => {
    instance = new Publisher();
  });

  test("publisher does nothing if provided bad event name", () => {
    const cb = jest.fn();
    instance.subscribe("event", cb);
    instance.publish("wrong");

    expect(cb).not.toBeCalled();
  });

  test("publisher call an callback", () => {
    const cb = jest.fn();
    instance.subscribe("event", cb);
    instance.publish("event");

    expect(cb).toBeCalled();
  });

  test("publisher call an callback multiple times", () => {
    const cb = jest.fn();
    instance.subscribe("event", cb);
    
    instance.publish("event");
    instance.publish("event");
    instance.publish("event");

    expect(cb).toBeCalledTimes(3);
  });

  test("publisher calls multiple callbacks", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    instance.subscribe("event", cb1);
    instance.subscribe("event", cb2);

    instance.publish("event");

    expect(cb1).toBeCalled();
    expect(cb2).toBeCalled();
  });

  test("publisher calls multiple callbacks in order", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    const cb3 = jest.fn();

    instance.subscribe("event", cb1);
    instance.subscribe("event", cb2);
    instance.subscribe("event", cb3);

    instance.publish("event");

    expect(cb2).toHaveBeenCalledAfter(cb1);
    expect(cb3).toHaveBeenCalledAfter(cb2);
  });

  test("publisher calls multiple events", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    instance.subscribe("eventOne", cb1);
    instance.subscribe("eventTwo", cb2);

    instance.publish("eventOne");
    instance.publish("eventTwo");

    expect(cb1).toBeCalled();
    expect(cb2).toBeCalled();
  });

  test("publisher calls an event with argument", () => {
    const cb1 = jest.fn();

    instance.subscribe("event", cb1);
    
    instance.publish("event", "myArg1");
    instance.publish("event", "myArg2");
    
    expect(cb1).toBeCalledWith("myArg1");
    expect(cb1).toBeCalledWith("myArg2");
  });
});
