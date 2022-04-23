const React = require("react");

import { MessengerChat } from "react-messenger-chat-plugin";
import Layout from "./src/containers/layout";

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      {element}
      <MessengerChat
        pageId="527856447380354"
        language="en_US"
        themeColor={"#F2F3G2"}
        height={24}
        loggedInGreeting="Hello logged in user!"
        loggedOutGreeting="Hello stranger!"
        autoExpand={true}
        debugMode={false}
        onMessengerShow={() => {
          console.log("onMessengerShow");
        }}
        onMessengerHide={() => {
          console.log("onMessengerHide");
        }}
        onMessengerDialogShow={() => {
          console.log("onMessengerDialogShow");
        }}
        onMessengerDialogHide={() => {
          console.log("onMessengerDialogHide");
        }}
      />
    </Layout>
  );
};
