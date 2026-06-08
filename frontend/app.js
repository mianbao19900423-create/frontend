const API_URL = "https://house-video-ai.onrender.com"; // 替换成 Render 后端地址

const fileInput = document.getElementById("file");
const uploadBtn = document.getElementById("uploadBtn");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");

uploadBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert("请选择视频文件");
        return;
    }

    statusEl.innerText = "上传中...";
    resultEl.innerText = "";

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            throw new Error(`请求失败: ${res.status}`);
        }

        const data = await res.json();
        statusEl.innerText = "识别完成";
        resultEl.innerText = JSON.stringify(data, null, 2);
    } catch (err) {
        statusEl.innerText = "识别失败";
        resultEl.innerText = err.message;
    }
});