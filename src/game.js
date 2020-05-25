import "./style.css";
import { Model } from "./gameOfLife/model";
import { View } from "./gameOfLife/view";
import { controller } from "./gameOfLife/controller.js";

const model = new Model();

const view = new View(model);
view.initView();

controller(model);
