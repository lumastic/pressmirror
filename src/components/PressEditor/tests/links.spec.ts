describe("Link mark", () => {
  const EXAMPLE_LINK = "https://www.lumastic.com";
  let editor, frame;
  beforeEach(async () => {
    await page.goto("http://localhost:6006/?path=/story/presseditor--basic");
    await page.waitForTimeout(2000);
    // page.on("console", (message) => console.log(message.text()));
    page.on("dialog", async (dialog) => {
      dialog.accept(EXAMPLE_LINK);
    });
    frame = page.frames().find((frame) => {
      return frame.name() === "storybook-preview-iframe";
    });
    editor = await frame.$(".ProseMirror");
  });

  test("should add link with keyboard shortcut", async () => {
    await editor.focus();
    // Add some text
    await page.keyboard.type("This is some text");
    // Select 'some text' with arrow keys
    await page.keyboard.down("Shift");
    for (let i = 0; i < 9; i += 1) {
      await page.keyboard.press("ArrowLeft");
    }
    await page.keyboard.up("Shift");
    // Bring up Link dialog
    await page.keyboard.down("Meta");
    await page.keyboard.press("k");
    await page.keyboard.up("Meta");
    /**
     * At this point, the link prompt opens and the dialog handler established
     * in the beforeEach is run with the EXAMPLE_LINK as the accept string
     */
    // Grab the document json from the debugger
    const doc = await frame.$eval("#root > pre", (element) => {
      return JSON.parse(element.innerHTML);
    });
    expect(
      doc?.doc.content[0].content[1].marks.find((mark) => mark.type === "link")
    ).toBeTruthy();
    expect(
      doc?.doc.content[0].content[1].marks.find((mark) => mark.type === "link")
        .attrs.href
    ).toBe(EXAMPLE_LINK);
  }, 120000);
});
