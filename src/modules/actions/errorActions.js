export const errorMessage = (error) => {
  return JSON.stringify({ status: error.response.status, message: error.response.message });
};

export const catchError = (error, callback) => {
  const message = JSON.parse(error.message);
  console.log(message);
  const { status } = message;
  if (status === 401) {
    alert("인증이 만료되었습니다.");
  } else if (status === 403) {
    alert("사용량이 초과되었습니다.");
  } else {
    alert(`에러가 발생하였습니다.`);
  }

  callback();
};
