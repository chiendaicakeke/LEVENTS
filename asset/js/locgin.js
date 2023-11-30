import storage from "./storage.js";

import { login } from "./handlelogin.js";

function handleForm() {
  const loginBtn = document.querySelector(".fourth__button");
  const form = document.forms["login"];

  loginBtn.onclick = async function () {
    var username = form.elements.username.value;
    var password = form.elements.password.value;
    if (username === "" || password === "") {
      alert("Bạn chưa nhập đủ thông tin tài khoản!");
      return;
    }
    var formData = {
      username,
      password,
    };
    const fetchdt = await login(formData);
    console.log(fetchdt);

    if (!fetchdt || fetchdt.message) {
      alert("Bạn nhập sai tài khoản hoặc mật khẩu! Yêu cầu nhập lại");
      form.elements.username.value = "";
      form.elements.username.focus();
      form.elements.password.value = "";
      return;
    }

    storage.set("account", fetchdt);
    fetchdt.role === "nomal"
      ? location.assign("/")
      : location.assign("./Admin/Tongquan.html");
  };

  form.onsubmit = (e) => {
    e.preventDefault();
  };
}

handleForm();
