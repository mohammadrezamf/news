import { Button, Link, styled, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Heart } from "iconsax-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//styles
const BoxStyle = styled(Box)((theme) => ({
  backgroundImage: "linear-gradient(to top, #09203f 0%, #537895 100%)",
  borderRadius: "5px",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
}));

export default function NewsDetail(props) {
  const [input, setInput] = useState(false);
  const [comment, setComment] = useState("");
  const { item } = props;
  const [like, setLike] = useState(item.like);
  const dispatch = useDispatch();

  // --------
  const commentHandler = (e) => {
    setComment(e.target.value);
  };
  const saveCommentHandler = () => {
    dispatch({ type: "saveComment", payload: { ...item, comment } });
    setInput(false);
  };

  const deleteCommentHandler = () => {
    setComment("");
    setInput(false);
  };

  const selectHandler = () => {
    dispatch({ type: "selectItem", payload: item });
  };

  const likeHandler = () => {
    setLike(!like);
    if (!like) {
      dispatch({ type: "like", payload: { ...item, like: true } });
    } else {
      dispatch({ type: "unLike", payload: { ...item, like: false } });
    }
  };

  return (
    <>
      <BoxStyle sx={{ minHeight: "400px", py: 1 }}>
        <Stack
          sx={{ alignItems: "space-between", justifyContent: "space-between" }}
        >
          <Typography variant="h5" align="center" sx={{ minHeight: "150px" }}>
            {item.title}
          </Typography>
          <Box sx={{ justifyContetn: "center", alignItems: "center" }}>
            <img
              src={item.image}
              alt=""
              style={{ width: "100%", height: "200px" }}
            />
          </Box>
          <Stack
            sx={{
              pb: 1,
              minHeight: "250px",
              justifyContent: "space-between",
            }}
          >
            <Stack>
              <Typography sx={{ px: 2, maxheight: "300px" }}>
                {item.summary}
              </Typography>
              <Stack
                direction="row"
                sx={{ mt: 2, justifyContent: "space-between", px: 2 }}
              >
                <Typography variant="caption">{item.author.name}</Typography>
                <Typography variant="caption">{item.date_published}</Typography>
              </Stack>
              <Box
                direction="row"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  pl: 2,
                  my: 1,
                  flexWrap: "wrap",
                }}
              >
                {item.tags?.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ borderRadius: 1, backgroundColor: "#94a3b8" }}
                  >
                    <Typography key={index}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "center", gap: 2 }}
            >
              <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
                <Link href={item.url}>
                  <Typography align="center" sx={{ border: 1, width: "100px" }}>
                    news link
                  </Typography>
                </Link>
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Typography
                  onClick={() => setInput(!input)}
                  sx={{ cursor: "pointer" }}
                >
                  comment
                </Typography>
                <Typography onClick={selectHandler} sx={{ cursor: "pointer" }}>
                  saved
                </Typography>
                <Stack
                  onClick={likeHandler}
                  sx={{ alignItems: "center", cursor: "pointer" }}
                >
                  <Heart
                    variant="Bold"
                    size="20"
                    color={like ? "red" : "#fff"}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </BoxStyle>
      {item.comment && (
        <Box>
          <Typography> comment :{item.comment}</Typography>
        </Box>
      )}
      {input && (
        <Stack>
          <TextField
            id="standard-multiline-static"
            label="your commnet"
            multiline
            rows={4}
            defaultValue="type your oponion"
            variant="standard"
            value={comment}
            onChange={commentHandler}
          />
          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Button onClick={saveCommentHandler}>save comment</Button>
            {comment && (
              <Button color="error" onClick={deleteCommentHandler}>
                delete comment
              </Button>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}
