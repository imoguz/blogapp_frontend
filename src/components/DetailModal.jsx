import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import DeleteBlog from "./DeleteBlog";
import UpdateBlog from "./UpdateBlog";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 415,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};
export default function DetailModal({ open, setOpen, action }) {
  const { activeBlog } = useSelector((state) => state.blog);
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {action === "delete" ? (
            <DeleteBlog setOpen={setOpen} id={activeBlog._id} />
          ) : (
            <UpdateBlog setOpen={setOpen} activeBlog={activeBlog} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
