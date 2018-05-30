import angular from "angular";
import notification from "angular-ui-notification";
import "angular-ui-notification/dist/angular-ui-notification.css";

export default angular.module("notification", [notification]).config([
  "NotificationProvider",
  (NotificationProvider) => {
    NotificationProvider.setOptions({
      delay: 10000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: "center",
      positionY: "bottom"
    });
  }
]).name;
