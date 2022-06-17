import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/chatbox";
import MyChats from "../components/myChats";
import SideDrawer from "../components/miscellaneous/sideDrawer";
import { ChatState } from "../context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">

        {/* first check if user is logged in
        then fetch all his chats and render them in left div */}

        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
