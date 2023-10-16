console.log("hi my name is calos cabi");

document.addEventListener("click", (e) => {
  if (e.target.dataset.short) {
    // console.log("hi");
    const url = `${window.location.origin}/${e.target.dataset.short}`;

    navigator.clipboard
      .writeText(url)
      .then(() => console.log("Texto copiado en el portapapeles"))
      .catch((err) => console.log("Algo ocurrio", err));
  }
});
