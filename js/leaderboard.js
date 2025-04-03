function connectWebSocket() {
  const socket = new SockJS("http://localhost:8080/leaderboard");
  const stompClient = Stomp.over(socket);
  const headers = {
    Authorization: "Basic " + btoa("user_guess:cantfindthepassword"),
  };

  stompClient.connect(
    headers,
    function (frame) {
      console.log("Connected to WebSocket:", frame);
      stompClient.subscribe("/topic/leader-board", function (message) {
        console.log("🏓 Có thay đổi bảng xếp hạng!");
        fetchLeaderboard();
      });
    },
    function (error) {
      console.error("WebSocket error:", error);
    }
  );
}

async function fetchLeaderboard() {
  const username = "user_guess";
  const password = "cantfindthepassword";
  const basicAuth = "Basic " + btoa(username + ":" + password);

  try {
    const response = await fetch(
      "http://localhost:8080/leaderboards?currentPage=1&pageSize=10",
      {
        headers: {
          Authorization: basicAuth,
        },
      }
    );
    const result = await response.json();

    if (result.code === 200 && result.data.list.length > 0) {
      renderLeaderboard(result.data.list);
    } else {
      document.getElementById("leaderboard").innerHTML =
        '<p class="text-muted">Chưa có ai ghi danh hôm nay...</p>';
    }
  } catch (error) {
    console.error("Lỗi khi tải bảng xếp hạng:", error);
    document.getElementById("leaderboard").innerHTML =
      '<p class="text-danger">Không thể tải bảng xếp hạng!</p>';
  }
}

function renderLeaderboard(data) {
  const container = document.getElementById("leaderboard");
  container.innerHTML = "";

  const podiumWrapper = document.createElement("div");
  podiumWrapper.className = "row text-center mb-4";

  [1, 0, 2].forEach((pos) => {
    if (data[pos]) {
      const user = data[pos];
      const col = document.createElement("div");
      col.className = "col podium animate__animated animate__fadeInUp";
      let icon = pos === 0 ? "🥇" : pos === 1 ? "🥈" : "🥉";
      let color = pos === 0 ? "#e91e63" : pos === 1 ? "#3f51b5" : "#009688";

      col.innerHTML = `
            <div style="background:${color};color:white;padding:16px;border-radius:12px;">
            <div style="font-size:32px">${icon}</div>
            <div style="font-size:18px;font-weight:bold;">${user.userGuessCorrect}</div>
            <div style="font-size:14px">${user.dateTime}</div>
            </div>`;

      podiumWrapper.appendChild(col);
    }
  });

  container.appendChild(podiumWrapper);

  data.slice(3).forEach((user, index) => {
    const row = document.createElement("div");
    row.className =
      "entry animate__animated animate__fadeInUp animate__delay-" +
      (index + 1) +
      "s";
    row.innerHTML = `
        <span class="rank">#${index + 4}</span>
        <span style="color: #555;">${user.userGuessCorrect}</span>
        <span class="text-muted" style="font-size:14px">${user.dateTime}</span>
        `;
    container.appendChild(row);
  });
}

window.onload = () => {
  fetchLeaderboard();
  connectWebSocket();
};
