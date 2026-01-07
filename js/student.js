window.addEventListener("DOMContentLoaded", () => {
  let elUserCard = document.querySelector(".user-card");
  let elStudents = document.querySelector(".student-body");
  let elLogOut = document.querySelector(".logout");
  let elSearchInput = document.querySelector(".students-search");

  let imgUrl = null;
  let baseUrl = "http://localhost:3000";
  let teacher = JSON.parse(localStorage.getItem("teacher"));
  let studentsData = [];
  let searchTimeout;

  if (elLogOut) {
    elLogOut.addEventListener("dblclick", () => {
      localStorage.clear();
      location.pathname = "/pages/signin.html";
    });
  }
  window.openInfo = openInfo;
  function openInfo(id) {
    localStorage.removeItem("info");
    axios.get(`${baseUrl}/students/${id}`).then((res) => {
      localStorage.setItem("info", JSON.stringify(res.data));
      location.pathname = "/pages/info.html";
    });
  }

  function renderStudents(arr, list) {
    list.innerHTML = "";
    arr.forEach((item) => {
      let student = document.createElement("tr");
      list.appendChild(student);
      student.classList.add("student-row");
      student.innerHTML = `
                <td class="photo">
                    <img src="${
                      item.img || "./../images/default-img.svg"
                    }" width="56" height="56" alt="Student"> 
                </td>
                <td>${item.firstName || ""} ${item.lastName || ""}</td>
                <td class="email">${item.email || ""}</td>
                <td class="phone">${item.phone || ""}</td>
                <td class="enroll">${item.enrollNumber || ""}</td>
                <td>${item.date || ""}</td>
                <td class="actions">
                   <div class="flex items-center gap-x-2">
                    <button onclick="window.openInfo(${
                      item.id
                    })" class="info-btn w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
                        <img src="./../images/three-dots.svg" class="w-5 h-5" alt="More icon">
                    </button>
                    <button class="edit-btn w-8 h-8 flex items-center justify-center hover:bg-blue-100 rounded">
                        <img src="./../images/edit.svg" class="w-5 h-5" alt="Edit icon">
                    </button>
                    <button  class="delete-btn w-8 h-8 flex items-center justify-center hover:bg-red-100 rounded">
                        <img src="./../images/trash.svg" class="w-5 h-5" alt="Trash icon">
                    </button>
                </div>
                </td>
            `;
    });
  }

  function searchStudents(arr, search) {
    if (!search || search.trim() === "") return arr;

    const searchLower = search.toLowerCase();
    return arr.filter((item) => {
      const firstName = (item.firstName || "").toLowerCase();
      const lastName = (item.lastName || "").toLowerCase();
      const email = (item.email || "").toLowerCase();

      return (
        firstName.includes(searchLower) ||
        lastName.includes(searchLower) ||
        email.includes(searchLower)
      );
    });
  }

  if (teacher) {
    axios
      .get(`${baseUrl}/teachers/${teacher.id}`)
      .then((res) => {
        if (elLogOut) {
          elLogOut.classList.remove("hidden");
          elLogOut.classList.add("block");
        }

        if (elUserCard) {
          elUserCard.classList.remove("hidden");
          elUserCard.classList.add("block");
          elUserCard.innerHTML = `
                    <label class="cursor-pointer">
                        <input type="file" class="hidden image-input"/>
                        <img src="${res.data.img}" width="128" height="128" class="rounded-[50%] hover:opacity-80 transition" alt="Teacher Avatar"/>
                    </label>
                    <h3 class="user-name">${res.data.firstName} ${res.data.lastName}</h3>
                    <span>Teacher</span>
                `;

          const elChooseImage = elUserCard.querySelector(".image-input");
          const elTeacherImg = elUserCard.querySelector("img");

          if (elChooseImage && elTeacherImg) {
            elChooseImage.addEventListener("change", (e) => {
              if (e.target.files[0]) {
                imgUrl = URL.createObjectURL(e.target.files[0]);
                const fileName = e.target.files[0].name;
                console.log("Image selected:", fileName);

                elTeacherImg.src = imgUrl;

                axios.patch(`${baseUrl}/teachers/${teacher.id}`, {
                    img: imgUrl,
                  })
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${baseUrl}/students`)
      .then((res) => {
        studentsData = res.data;
        if (elStudents) {
          renderStudents(studentsData, elStudents);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (elSearchInput) {
      elSearchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          const searchTerm = e.target.value.trim();
          const filteredStudents = searchStudents(studentsData, searchTerm);
          if (elStudents) {
            renderStudents(filteredStudents, elStudents);
          }
        }, 300);
      });
    }
  } else {
    location.pathname = "/pages/signin.html";
  }
});
