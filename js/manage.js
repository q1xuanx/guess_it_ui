const pageSize = 5;
const username = "user_guess";
const password = "cantfindthepassword";
const basicAuth = "Basic " + btoa(username + ":" + password);

window.onload = loadData();

function getCurrentPage() {
  let getCurrentPage = sessionStorage.getItem("currentPage");
  if (getCurrentPage == null || getCurrentPage == undefined) {
    getCurrentPage = 1;
    sessionStorage.setItem("currentPage", 1);
  }
  return parseInt(getCurrentPage);
}

async function loadData() {
  let currentPage = getCurrentPage();
  try {
    const response = await fetch(
      `http://localhost:8080/wrong-guesses?currentPage=${currentPage}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
      }
    );
    const result = await response.json();
    if (result.code == 200) {
      renderListData(result.data.list);
      sessionStorage.setItem("totalPage", result.data.total_pages);
    }
  } catch (e) {
    alert(e);
  }
}

function renderListData(data) {
  const holder = document.getElementById("holder");
  holder.innerHTML = "";
  data.forEach((element) => {
    const art = document.createElement("article");
    art.className = "page-item d-flex justify-content-between";
    art.innerHTML = `
                        <span class='d-block text-center mt-3 fw-bold'> ${element.guess} </span>
                        <time datetime=${element.timeGuess} class='d-block text-center mt-3 fw-bold'>${element.timeGuess}</time>
                    `;
    holder.append(art);
  });
}

async function nextPage() {
  let currentPage = getCurrentPage() + 1;
  let totalItem = sessionStorage.getItem("totalPage");
  if (currentPage > totalItem) {
    currentPage = 1;
  }
  sessionStorage.setItem("currentPage", currentPage);
  try {
    const response = await fetch(
      `http://localhost:8080/wrong-guesses?currentPage=${currentPage}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
      }
    );
    const result = await response.json();
    if (result.code == 200) {
      renderListData(result.data.list);
      sessionStorage.setItem("totalPage", result.data.total_pages);
    }
  } catch (e) {
    alert(e);
  }
}
async function previousPage() {
  let currentPage = getCurrentPage() - 1;
  let totalItem = sessionStorage.getItem("totalPage");
  if (currentPage < 0) {
    currentPage = 1;
  }
  sessionStorage.setItem("currentPage", currentPage);
  try {
    const response = await fetch(
      `http://localhost:8080/wrong-guesses?currentPage=${currentPage}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: basicAuth,
        },
      }
    );
    const result = await response.json();
    if (result.code == 200) {
      renderListData(result.data.list);
      sessionStorage.setItem("totalPage", result.data.total_pages);
    }
  } catch (e) {
    alert(e);
  }
}
