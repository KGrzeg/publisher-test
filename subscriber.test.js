const Subscriber = require("./subscriber");

describe("Subscriber", () => {
  let instance;

  beforeEach(() => {
    instance = new Subscriber();
  });

  test("subscriber does nothing if provided bad event name", () => {
    const cb = jest.fn();
    instance.subscribe("event", cb);
    instance.emit("wrong");

    expect(cb).not.toBeCalled();
  });

  test("subscriber call an callback", () => {
    const cb = jest.fn();
    instance.subscribe("event", cb);
    instance.emit("event");

    expect(cb).toBeCalled();
  });

  test("subscriber call an callback multiple times", () => {
    const cb = jest.fn();
    instance.subscribe("event", cb);
    
    instance.emit("event");
    instance.emit("event");
    instance.emit("event");

    expect(cb).toBeCalledTimes(3);
  });

  test("subscriber calls multiple callbacks", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    instance.subscribe("event", cb1);
    instance.subscribe("event", cb2);

    instance.emit("event");

    expect(cb1).toBeCalled();
    expect(cb2).toBeCalled();
  });

  test("subscriber calls multiple callbacks in order", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    const cb3 = jest.fn();

    instance.subscribe("event", cb1);
    instance.subscribe("event", cb2);
    instance.subscribe("event", cb3);

    instance.emit("event");

    expect(cb2).toHaveBeenCalledAfter(cb1);
    expect(cb3).toHaveBeenCalledAfter(cb2);
  });

  test("subscriber calls multiple events", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    instance.subscribe("eventOne", cb1);
    instance.subscribe("eventTwo", cb2);

    instance.emit("eventOne");
    instance.emit("eventTwo");

    expect(cb1).toBeCalled();
    expect(cb2).toBeCalled();
  });

  test("subscriber calls an event with argument", () => {
    const cb1 = jest.fn();

    instance.subscribe("event", cb1);
    
    instance.emit("event", "myArg1");
    instance.emit("event", "myArg2");
    
    expect(cb1).toBeCalledWith("myArg1");
    expect(cb1).toBeCalledWith("myArg2");
  });
});
