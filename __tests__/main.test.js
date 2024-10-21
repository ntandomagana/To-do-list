import {
  arr,
  addTask,
  deleteTask,
  editTask,
  taskDone,
} from "../functionality.js";

describe("Testing array", () => {
  beforeEach(() => {
    arr.length = 0;
  });

  test("array should be defined", () => {
    expect(arr).toBeDefined();
  });

  test("testing array", () => {
    // console.log(arr.length);

    expect(arr.length).toEqual(0);
  });

  test("checking type of array", () => {
    // console.log(typeof(arr))
    expect(typeof arr).toEqual("object");
  });
});

describe("[addTask]", () => {
  const taskValue = "new Task";

  test("Array should have one element", () => {
    addTask(taskValue);
    expect(arr.length).toEqual(1);
  });

  //  test('taskValue not to be null', () =
});

describe("[delete]", () => {
  test("Array should have zero element", () => {
    const taskValue = "new Task";

    deleteTask(0, taskValue);
    expect(arr.length).toEqual(0);
  });

  //  test('taskValue not to be null', () =
});


;
