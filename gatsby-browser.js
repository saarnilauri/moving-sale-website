const React = require("react");

import "@fontsource/londrina-solid";
import "@fontsource/battambang";
import "./src/styles/global.css";

import { MessengerChat, showMessenger } from "react-messenger-chat-plugin";
import Layout from "./src/containers/layout";
/*
export const wrapPageElement = ({ element }) => (
  <>
    {element}
    <MessengerChat />
  </>
);
*/

export const wrapPageElement = ({ element, props }) => {
  return (
    <Layout {...props}>
      {element}
      <MessengerChat
        pageId="113089071381221"
        language="en_US"
        height={24}
        loggedInGreeting="Hello logged in user!"
        loggedOutGreeting="Hello stranger!"
        autoExpand={true}
        debugMode={true}
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
