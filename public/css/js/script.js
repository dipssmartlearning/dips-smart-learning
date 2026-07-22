document.addEventListener("DOMContentLoaded", () => {
  console.log("Dips Smart Learning Loaded Successfully");

  const year = new Date().getFullYear();
  const footer = document.getElementById("year");

  if (footer) {
    footer.textContent = year;
  }

  const btn = document.querySelector(".btn");

  if (btn) {
    btn.addEventListener("click", () => {
      alert("Welcome to Dips Smart Learning!");
    });
  }
});
