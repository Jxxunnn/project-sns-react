import { useEffect, useState } from "react";
import API from "../../utils/api";
import Comments from "./Comments";
import Writing from "./Writing";
import postData from "../../utils/postData";

/** 댓글 삭제 할때 필요할 것 같아서 setCommentData 프롭스 추가 사용안하면 지우기*/
export default function Dialog({ comments, setPostPageData }) {
  const [myInfo, setMyInfo] = useState("");
  const getMyInfo = async () => {
    const response = await API.get("/user/myinfo", {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    const responseData = await response.data;

    setMyInfo(responseData);
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <>
      {comments && myInfo ? (
        <section>
          <h3 class="sr-only">댓글 창</h3>
          <Comments
            comments={comments}
            myInfo={myInfo}
            setPostPageData={setPostPageData}
          />
          <Writing comments={comments} setPostPageData={setPostPageData} />
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
