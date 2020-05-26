export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    document.getElementById("start").onclick = () => this.model.run();
    document.getElementById("stop").onclick = () => this.model.stop();
    document.getElementById("reset").onclick = () => this.model.reset();
    this.model.addObserver(this.view);
    this.view.initView();
    this.model.init();
  }
}
