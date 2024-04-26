const elements = {
  uploadBox: document.querySelector(".upload-box"),
  previewImg: document.querySelector(".upload-box img"),
  fileInput: document.querySelector(".upload-box input"),
  widthInput: document.querySelector(".width input"),
  heightInput: document.querySelector(".height input"),
  ratioInput: document.querySelector(".ratio input"),
  qualityInput: document.querySelector(".quality input"),
  downloadBtn: document.querySelector(".download-btn"),
  wrapper: document.querySelector(".wrapper"),
};

let ogImageRatio;

const loadFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  elements.previewImg.src = URL.createObjectURL(file);
  elements.previewImg.addEventListener("load", () => {
    elements.widthInput.value = elements.previewImg.naturalWidth;
    elements.heightInput.value = elements.previewImg.naturalHeight;
    ogImageRatio =
      elements.previewImg.naturalWidth / elements.previewImg.naturalHeight;
    elements.wrapper.classList.add("active");
  });
};

const updateWidthInput = () => {
  const height = elements.ratioInput.checked
    ? elements.widthInput.value / ogImageRatio
    : elements.heightInput.value;
  elements.heightInput.value = Math.floor(height);
};

const updateHeightInput = () => {
  const width = elements.ratioInput.checked
    ? elements.heightInput.value * ogImageRatio
    : elements.widthInput.value;
  elements.widthInput.value = Math.floor(width);
};

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  const imgQuality = elements.qualityInput.checked ? 0.5 : 1.0;

  canvas.width = elements.widthInput.value;
  canvas.height = elements.heightInput.value;

  ctx.drawImage(elements.previewImg, 0, 0, canvas.width, canvas.height);

  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click();
};

elements.downloadBtn.addEventListener("click", resizeAndDownload);
elements.fileInput.addEventListener("change", loadFile);
elements.uploadBox.addEventListener("click", () => elements.fileInput.click());
elements.widthInput.addEventListener("keyup", updateWidthInput);
elements.heightInput.addEventListener("keyup", updateHeightInput);
