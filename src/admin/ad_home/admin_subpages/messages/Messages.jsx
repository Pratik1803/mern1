import React from "react";
import Styles from "./Messages.module.scss";
import { Button, CircularProgress, Stack } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Messages() {
  const [loading, setLoading] = useState(false);
  const [msgData, setMsgData] = useState([]);

  const deleteMsg = async (_id) => {
    setLoading(true);
    const result = await axios({
      method: "delete",
      url: "/admin/messages",
      data: { _id },
    });
    if (result.statusText === "OK") {
      setMsgData((prev) => prev.filter((msg) => msg._id !== _id));
    }
    console.log(result);
    setLoading(false);
  };

  const getMsgs = async () => {
    setLoading(true);
    const result = await axios({
      method: "get",
      url: "/admin/messages",
    });
    // console.log(result);
    setMsgData(result.data);
    setLoading(false);
  };
  useEffect(() => {
    getMsgs();
  }, []);

  function MessageCard({ data }) {
    return (
      <div className={Styles.message_card}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <div>
            <label htmlFor="">Username:</label>
            <p>{data.username}</p>
          </div>
          <div>
            <label htmlFor="">Contact No.:</label>
            <p>{data.contact}</p>
          </div>
        </Stack>
        <label htmlFor="">Email:</label>
        <p>{data.email}</p>
        <label htmlFor="">Message:</label>
        <p>{data.message}</p>
        <div className={Styles.bottom_btns}>
          <a
            href={`mailto:${data.email}`}
            target={"_blank"}
            style={{ textDecoration: "none" }}
          >
            <Button
              style={{
                marginRight: "10px",
                backgroundColor: "#73D06F ",
                color: "#fff",
              }}
            >
              Mail Back
            </Button>
          </a>
          <Button
            onClick={() => {
              deleteMsg(data._id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.messages}>
      {loading ? (
        <CircularProgress
          style={{
            color: "#70b8f7",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ) : (
        <div className={Styles.msg_wrapper}>
          {msgData?.map((msg, index) => (
            <MessageCard data={msg} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Messages;
