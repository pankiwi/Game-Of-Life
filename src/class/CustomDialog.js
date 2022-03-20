class CustomDialog extends Dialog {
  constructor() {
    super()
  }

  alert(message, config = { target: EventTarget }) {
    const settings = Object.assign({}, config, { cancel: '', message, template: '', dialogClass: "dialog font" });
    this.open(settings);
    return this.waitForUser();
  }

  confirm(message, config = { target: EventTarget }) {
    const settings = Object.assign({}, config, { message, template: '', dialogClass: "dialog font" });
    this.open(settings);
    return this.waitForUser();
  }

  prompt(message, value, config = { target: EventTarget }) {
    const template = `<label aria-label="${message}"><input type="text" name="prompt" value="${value}"></label>`;
    const settings = Object.assign({}, config, { message, template, dialogClass: "dialog font" });
    this.open(settings);
    return this.waitForUser();
  }

  window(message, template, config = { target: EventTarget }) {
    const settings = Object.assign({}, config, { message, template, dialogClass: "dialog font", cancel: "" });
    this.open(settings);
  }


}
