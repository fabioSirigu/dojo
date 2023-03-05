const fileSelect = document.getElementById("fileSelect"),
      fileElem = document.getElementById("fileElem"),
      fileList = document.getElementById("fileList");

fileSelect.addEventListener(
      "click",
      (e) => {
            if (fileElem) {
                  fileElem.click();
            }
            e.preventDefault(); // prevent navigation to "#"
      },
      false
);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
      if (!this.files.length) {
            fileList.innerHTML = "<p>No files selected!</p>";
      } else {
            fileList.innerHTML = "";
            const list = document.createElement("ul");
            fileList.appendChild(list);
            for (let i = 0; i < this.files.length; i++) {
                  const li = document.createElement("li");
                  list.appendChild(li);

                  const img = document.createElement("img");
                  img.src = URL.createObjectURL(this.files[i]);
                  img.height = 400;
                  img.onload = () => {
                        URL.revokeObjectURL(img.src);
                        // Aggiorna i filtri dell'immagine ogni volta che un input range viene cambiato
                        const blurInput = document.getElementById("blur");
                        const brightnessInput = document.getElementById("brightness");
                        const grayscaleInput = document.getElementById("grayscale");
                        const opacityInput = document.getElementById("opacity");

                        blurInput.addEventListener("input", updateFilters);
                        brightnessInput.addEventListener("input", updateFilters);
                        grayscaleInput.addEventListener("input", updateFilters);
                        opacityInput.addEventListener("input", updateFilters);

                        function updateFilters() {
                              // Applica i filtri all'immagine
                              const blurValue = blurInput.value;
                              const brightnessValue = brightnessInput.value;
                              const grayscaleValue = grayscaleInput.value;
                              const opacityValue = opacityInput.value;

                              img.style.filter = `blur(${blurValue}px) brightness(${brightnessValue}%) grayscale(${grayscaleValue}%) opacity(${opacityValue}%)`;

                        };
                        li.appendChild(img);

                  }
            }
      }


}
