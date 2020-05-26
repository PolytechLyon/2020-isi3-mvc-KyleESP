export class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.addObserver(view);
    document.getElementById("start").onclick = () => model.run();
    document.getElementById("stop").onclick = () => model.stop();
    document.getElementById("reset").onclick = () => model.reset();
  }

  init() {
    this.view.initView();
    this.model.init();
  }
}
