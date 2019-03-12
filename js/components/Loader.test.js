import Loader from "./Loader";
document.body.innerHTML = "<div id='holder'></div>";
const holder = document.querySelector("#holder");
const loader = new Loader(holder);

test("Creating a new loader should generate the correct html", () => {
  expect(loader).toMatchSnapshot();
});

test("A hidden loader should have a display of none", () => {
  loader.hide();
  expect(loader.loaderHTML.style.display).toBe("none");
});

test("A shown loader should have a display of block", () => {
  loader.show();
  expect(loader.loaderHTML.style.display).toBe("block");
});
