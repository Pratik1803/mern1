import React, { useEffect, useState } from "react";
import Styles from "./Admin.module.scss";
import { useNavigate } from "react-router-dom";
import Users from "./admin_subpages/users/Users";
import Messages from "./admin_subpages/messages/Messages";
import { Button, Modal } from "@mui/material";
import AddAdmin from "../../modals/admin/AddAdmin";
import { useParams } from "react-router-dom";

function Admin({ adminLogin }) {
  let navigate = useNavigate();
  const params = useParams();
  const adminName = params.admin_name;
  const [messagePage, setMessagePage] = useState(true);
  const [openCreateAdmin, setOpenCreateAdmin] = useState(false);
  useEffect(() => {
    if (!adminLogin) {
      navigate("/mern1/admin");
    }
  }, []);

  const createAdmin = () => {
    setOpenCreateAdmin(true);
  };

  return (
    <div className={Styles.admin}>
      <h1 style={{ fontSize: "48px" }}>Admin Portal</h1>
      <p style={{ fontSize: "24px" }}>Hii, {adminName}! How have you been?</p>
      <div className={Styles.btn_div}>
        <div></div>
        <Button className={Styles.add_admin} onClick={createAdmin}>
          Create New Admin
        </Button>
        <div className={Styles.page_change_btns}>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => {
              setMessagePage(true);
            }}
          >
            Messages
          </Button>
          <Button
            onClick={() => {
              setMessagePage(false);
            }}
          >
            Users
          </Button>
        </div>
      </div>
      <div className={Styles.subpage_wrapper}>
        <h1>{messagePage ? "Messages:" : "Users:"}</h1>
        {messagePage ? <Messages /> : <Users />}
      </div>
      <Modal open={openCreateAdmin}>
        <AddAdmin setOpenCreateAdmin={setOpenCreateAdmin} />
      </Modal>
    </div>
  );
}

export default Admin;
