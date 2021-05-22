import React from "react";
import { uploadPlaylist } from "../../modules/actions";
import useAsync from "../../modules/useAsync";

const UploadForm = ({ playlists, tracks }) => {
  const [uploadState, uploadRefetch] = useAsync(() => uploadPlaylist(playlists, tracks), [], true);
  const { loading, data: uploadData, error } = uploadState;

  const onClick = () => {
    window.open(`http://localhost:3000/library`);
  };

  if (loading) return <div>업로드중</div>;
  if (error) return <div>에러발생</div>;

  return (
    <div>
      <button disabled={uploadData} onClick={uploadRefetch}>
        업로드하기
      </button>
      {uploadData && (
        <div>
          <div>업로드 완료</div>
          <button onClick={onClick}>이동하기</button>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
