import SvgIcon from "../components/general/SvgIcon.vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonRouterOutlet,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonProgressBar,
  IonDatetime,
  IonIcon,
  IonInput,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonModal,
  IonDatetimeButton,
  IonImg,
  IonBadge,
  IonList,
  IonAvatar,
  IonButtons,
  IonMenu,
  IonMenuToggle,
  IonPopover,
  IonSearchbar,
  IonAccordion,
  IonAccordionGroup,
  IonFabButton,
  IonBackButton,
  IonNav,
  IonNavLink,
  IonNote,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  
} from "@ionic/vue";

import ChartBar from "@/components/general/ChartBar.vue";
import ChartPie from "@/components/general/ChartPie.vue";
import NavBar from "@/components/general/NavBar.vue";
function antd(app) {
  app.component("SvgIcon", SvgIcon);
  app.component("IonPage", IonPage);
  app.component("IonHeader", IonHeader);
  app.component("IonToolbar", IonToolbar);
  app.component("IonTitle", IonTitle);
  app.component("IonContent", IonContent);
  app.component("IonTabBar", IonTabBar);
  app.component("IonTabButton", IonTabButton);
  app.component("IonTabs", IonTabs);
  app.component("IonLabel", IonLabel);
  app.component("IonRouterOutlet", IonRouterOutlet);
  app.component("IonButton", IonButton);
  app.component("IonCard", IonCard);
  app.component("IonCardHeader", IonCardHeader);
  app.component("IonCardSubtitle", IonCardSubtitle);
  app.component("IonCardTitle", IonCardTitle);
  app.component("IonCardContent", IonCardContent);
  app.component("IonItem", IonItem);
  app.component("IonGrid", IonGrid);
  app.component("IonRow", IonRow);
  app.component("IonCol", IonCol);
  app.component("IonText", IonText);
  app.component("IonProgressBar", IonProgressBar);
  app.component("IonDatetime", IonDatetime);
  app.component("IonIcon", IonIcon);
  app.component("IonInput", IonInput);
  app.component("IonRange", IonRange);
  app.component("IonSelect", IonSelect);
  app.component("IonSelectOption", IonSelectOption);
  app.component("IonTextarea", IonTextarea);
  app.component("IonModal", IonModal);
  app.component("IonDatetimeButton", IonDatetimeButton);
  app.component("IonImg", IonImg);
  app.component("IonList", IonList);
  app.component("IonBadge", IonBadge);
  app.component("IonAvatar", IonAvatar);
  app.component("IonButtons", IonButtons);
  app.component("IonMenu", IonMenu);
  app.component("IonMenuToggle", IonMenuToggle);
  app.component("IonPopover", IonPopover);
  app.component("IonSearchbar", IonSearchbar);
  app.component("IonAccordion", IonAccordion);
  app.component("IonAccordionGroup", IonAccordionGroup);
  app.component("IonFabButton", IonFabButton);
  app.component("IonBackButton", IonBackButton);
  app.component("IonNav", IonNav);
  app.component("IonNavLink", IonNavLink);
  app.component("IonNote", IonNote);
  app.component("IonInfiniteScroll", IonInfiniteScroll);
  app.component("IonInfiniteScrollContent", IonInfiniteScrollContent);



  app.component("ChartBar", ChartBar);
  app.component("ChartPie", ChartPie);
  app.component("NavBar", NavBar);

}

export default antd;
