describe("PressEditor puppet", () => {
  let editor, frame;
  beforeAll(async () => {
    await page.goto("http://localhost:6006/?path=/story/presseditor--basic");
    await page.waitForTimeout(2000);
    page.on("console", (message) => console.log(message.text()));
    frame = page.frames().find((frame) => {
      return frame.name() === "storybook-preview-iframe";
    });
    editor = await frame.$(".ProseMirror");
  });
  test("should convert paragraph to header while keeping focus", async () => {
    await editor.focus();
    // Type characters in the editor
    await page.keyboard.type("12345");
    // Make the paragraph element a heading
    await page.keyboard.down("Meta");
    await page.keyboard.down("Shift");
    await page.keyboard.press("1");
    await page.keyboard.up("Meta");
    await page.keyboard.up("Shift");
    // Grab the document json from the debugger
    const doc = await frame.$eval("#root > pre", (element) => {
      return JSON.parse(element.innerHTML);
    });
    expect(doc?.doc.content[0].type).toBe("heading");
    expect(doc?.selection.anchor).toBe(6);
  }, 120000);
});
