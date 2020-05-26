import "./style.css";
import { Model } from "./gameOfLife/model";
import { View } from "./gameOfLife/view";
import { Controller } from "./gameOfLife/controller";

const model = new Model();

const view = new View();

const controller = new Controller(model, view);
controller.init();
