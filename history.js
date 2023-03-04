const searchTerm = localStorage.getItem("searchHistory");
const getli = document.getElementById("getli");

// display search term on page

for (let i = 0; i < searchTerm.length; i++) {
  const listItem = document.createElement("li");
  listItem.style.textAlign = "center";
  listItem.style.cursor = "pointer";
  listItem.style.border = "2px solid white";
  listItem.style.padding = "10px";
  listItem.textContent = searchTerm;
  getli.appendChild(listItem);
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  localStorage.clear();
});
