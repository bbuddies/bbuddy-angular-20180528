import angular from "angular";
import add from "./add.component";
import get from "./get.component";

export default angular.module("budget", [add, get]).name;
