import { Button, CircularProgress, Stack } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Styles from "./Users.module.scss";

function Users() {
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const deleteUser = async (_id) => {
    setLoading(true);
    try {
      const result = await axios({
        method: "delete",
        url: "/admin/users",
        data: { _id },
      });
      // console.log(result.statusText);
      if (result.statusText === "OK") {
        setUsersData((prev) => prev.filter((user) => user._id !== _id));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getUsers = async () => {
    setLoading(true);
    const result = await axios({
      method: "get",
      url: "/admin/users",
    });
    // console.log(result);
    setUsersData(result.data);
    setLoading(false);
  };
  useEffect(() => {
    getUsers();
  }, []);

  function UserCard({ data }) {
    return (
      <div className={Styles.userCard}>
        <div className={Styles.userCard_wrapper}>
          <Stack>
            <label htmlFor="">Username:</label>
            <p>{data.username}</p>
            <label htmlFor="">Email:</label>
            <p>{data.email}</p>
            <label htmlFor="">Contact No.:</label>
            <p>{data.contact}</p>
            <label htmlFor="">Profession:</label>
            <p>{data.profession}</p>
          </Stack>
          <div className={Styles.bottom_btns}>
            <Button
              onClick={() => {
                deleteUser(data._id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={Styles.users}>
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
        <div className={Styles.users_wrapper}>
          {usersData?.map((userData, index) => (
            <UserCard data={userData} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
