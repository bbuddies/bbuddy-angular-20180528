import angular from "angular";
import api from "./api";
import layout from "./layout";
import notification from "./config/notification.config";

export default angular.module("common", [api, notification, layout]).name;
