import React from "react";
import ConversationArea from "./final/ConversationArea";

function ServerContainer() {
  return <div className="bg-[#edf67d] w-20">SC</div>;
}
function ChannelList() {
  return <div className="bg-[#7251b5] w-60 ">CL</div>;
}
function ChatView() {
  return <div className="bg-[#eeddd3] flex-1">CV</div>;
}
function Members() {
  return <div className="bg-[#223843] w-60">M</div>;
}

const DiscordLayout = () => {
  return (
    <div className="flex  w-[100vw] h-[100vh]">
      <ServerContainer />
      <ChannelList />
      <ConversationArea />
      <Members />
    </div>
  );
};

export default DiscordLayout;
