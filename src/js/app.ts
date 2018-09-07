import Controller from "./controller";
import Template from "./template";
import Store from "./store";
import View from "./view";

export default class App {
  private store: Store;
  private template: Template;
  private view: View;
  private controller: Controller;

  constructor(private name: string) {
    this.store = new Store(this.name);
    this.template = new Template();
    this.view = new View(this.template);
    this.controller = new Controller(this.store, this.view);
  }
}
