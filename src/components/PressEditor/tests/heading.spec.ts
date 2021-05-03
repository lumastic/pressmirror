describe("Heading conversion", () => {
  let editor, frame;
  beforeEach(async () => {
    await page.goto("http://localhost:6006/?path=/story/presseditor--basic");
    await page.waitForTimeout(2000);
    // page.on("console", (message) => console.log(message.text()));
    frame = page.frames().find((frame) => {
      return frame.name() === "storybook-preview-iframe";
    });
    editor = await frame.$(".ProseMirror");
  });

  test("should convert paragraph to header with keyboard shortcut", async () => {
    await editor.focus();
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
  }, 120000);

  test("should convert to second level heading with keyboard shortcut", async () => {
    await editor.focus();
    // Make the paragraph element a heading
    await page.keyboard.down("Meta");
    await page.keyboard.down("Shift");
    await page.keyboard.press("2");
    await page.keyboard.up("Meta");
    await page.keyboard.up("Shift");
    // Grab the document json from the debugger
    const doc = await frame.$eval("#root > pre", (element) => {
      return JSON.parse(element.innerHTML);
    });
    expect(doc?.doc.content[0].type).toBe("heading");
    expect(doc?.doc.content[0].attrs.level).toBe(2);
  }, 120000);

  test("should convert paragraph to header while keeping selection position", async () => {
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

  test("should convert heading to paragraph while keeping selection position", async () => {
    await page.goto("http://localhost:6006/?path=/story/presseditor--heading");
    await page.waitForTimeout(2000);
    // page.on("console", (message) => console.log(message.text()));
    frame = page.frames().find((frame) => {
      return frame.name() === "storybook-preview-iframe";
    });
    editor = await frame.$(".ProseMirror");
    await editor.focus();
    // Move to end of editor
    await page.keyboard.down("Alt");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.up("Alt");
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
    expect(doc?.doc.content[0].type).toBe("paragraph");
    expect(doc?.selection.anchor).toBe(6);
  }, 120000);
});
