const captchaText = "gabimaru";
let stompClient = null;

async function submitGuess() {
  const pass = document.getElementById("passwordInput").value.trim();
  const captcha = document
    .getElementById("captchaInput")
    .value.trim()
    .toLowerCase();
  const resultMsg = document.getElementById("resultMsg");

  if (!pass) {
    resultMsg.textContent = "⚠️ Bạn chưa nhập mật khẩu!";
    return;
  }
  if (captcha !== captchaText) {
    resultMsg.textContent = "🚫 Mã kiểm tra sai rồi! Gõ lại từ: Gabimaru";
    return;
  }

  resultMsg.textContent = "⏳ Đang kiểm tra...";

  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    const response = await fetch("http://localhost:8080/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("user_guess:cantfindthepassword"),
      },
      body: JSON.stringify({ password: pass }),
    });

    const data = await response.json();

    if (response.ok && data.data === true) {
      const modal = new bootstrap.Modal(document.getElementById("winnerModal"));
      modal.show();
      resultMsg.textContent = "";
    } else {
      const failModal = new bootstrap.Modal(
        document.getElementById("failModal")
      );
      failModal.show();
      resultMsg.textContent = "";
    }
  } catch (err) {
    resultMsg.innerHTML = "⚠️ Có lỗi xảy ra khi kết nối với máy chủ.";
    console.error(err);
  }
}

function submitWinnerName() {
  const name = document.getElementById("winnerName").value.trim();
  if (!name) {
    alert("⚠️ Vui lòng nhập tên để ghi danh!");
    return;
  }

  const socket = new SockJS("http://localhost:8080/leaderboard");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function () {
    stompClient.send(
      "/leaderboard/correct-user",
      {},
      JSON.stringify({ nameUser: name })
    );
  });

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("winnerModal")
  );
  modal.hide();
  document.getElementById("resultMsg").textContent =
    "🏆 Tên của bạn đã được ghi danh vào bảng xếp hạng!";
}
