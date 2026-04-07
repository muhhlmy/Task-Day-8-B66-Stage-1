// ======================================
// ELEMENT REFERENCES
// ======================================

// Form inputs
const projectNameInput = document.getElementById("projectName");
const projectDescriptionInput = document.getElementById("projectDescription");
const projectStartDateInput = document.getElementById("projectStartDate");
const projectEndDateInput = document.getElementById("projectEndDate");
const projectImageInput = document.getElementById("projectImage");
const searchProjectInput = document.getElementById("searchProject");

// Containers
const projectContainer = document.getElementById("projectContainer");

// Form
const projectForm = document.getElementById("projectForm");

// Modal
const projectDetailModal = document.getElementById("projectModal");
const closeProjectModalButton = document.getElementById("closeModalBtn");

// ======================================
// STATE
// ======================================

// Menyimpan seluruh data project
let projectDataList = [];

// Ambil data project dari localStorage jika tersedia
const storedProjects = localStorage.getItem("projects");
if (storedProjects) {
  projectDataList = JSON.parse(storedProjects);
}

// ======================================
// FUNCTIONS
// ======================================

// Menampilkan seluruh project ke halaman
function renderProjectList() {
  if (projectDataList.length === 0) {
    projectContainer.innerHTML = `
    <h5 class="col-span-full text-center text-gray-500 w-full mt-10">
      Belum ada project saat ini.
      <br>
      Silakan tambahkan project baru di atas.
    </h5>
    `;
    return;
  }

  projectContainer.innerHTML = "";
  projectDataList.forEach((projectItem) => {
    projectContainer.appendChild(createProjectCard(projectItem));
  });
}

// Menghitung durasi project dalam format bulan
function getReadableProjectDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDifference = end - start; // Hasil dalam miliseconds
  const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Konversi ke hari
  const totalMonths = Math.floor(totalDays / 30); // Konversi sederhana ke bulan

  return `${totalMonths} bulan`;
}

// Menyimpan data project ke localStorage
function saveProjectsToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projectDataList));
}

// Membuat HTML card untuk satu project
function createProjectCard(projectItem) {
  let technologyIconsHTML = "";

  if (projectItem.techNodeJs == true) {
    technologyIconsHTML += '<i class="fa-brands fa-node-js text-2xl p-1"></i> ';
  }
  if (projectItem.techNextJs == true) {
    technologyIconsHTML +=
      '<span class="font-bold text-sm p-1">Next.JS</span> ';
  }
  if (projectItem.techReactJs == true) {
    technologyIconsHTML += '<i class="fa-brands fa-react text-2xl p-1"></i> ';
  }
  if (projectItem.techTypescript == true) {
    technologyIconsHTML += '<span class="font-bold text-sm p-1">TS</span> ';
  }

  // Ambil DOM element dari template HTML (yang ditaruh di Partials)
  const templateContent = document
    .getElementById("projectCardTemplate")
    .content.cloneNode(true);

  // Set nilai di dalam template
  templateContent.querySelector(".project-image").src = projectItem.image;
  templateContent.querySelector(".project-name").textContent = projectItem.name;
  templateContent.querySelector(".project-duration").textContent =
    "Duration: " + projectItem.duration;
  templateContent.querySelector(".project-description").textContent =
    projectItem.description;
  templateContent.querySelector(".project-techs").innerHTML =
    technologyIconsHTML;
  templateContent
    .querySelector(".btn-view-details")
    .setAttribute("data-id", projectItem.id);
  templateContent
    .querySelector(".btn-delete")
    .setAttribute("data-id", projectItem.id);

  return templateContent;
}

// Kerangka Object Data
function createObjectData(imageSource) {
  return {
    id: Date.now(),
    name: projectNameInput.value,
    description: projectDescriptionInput.value,
    duration: getReadableProjectDuration(
      projectStartDateInput.value,
      projectEndDateInput.value,
    ),
    techNodeJs: document.getElementById("nodejs").checked,
    techNextJs: document.getElementById("nextjs").checked,
    techReactJs: document.getElementById("reactjs").checked,
    techTypescript: document.getElementById("typescript").checked,
    image: imageSource,
  };
}

// Menyimpan Project
function addProject(projectData) {
  projectDataList.push(projectData);
  saveProjectsToLocalStorage();
  renderProjectList();
  projectForm.reset();
}

// ======================================
// EVENT HANDLERS
// ======================================

// Menangani submit form project
projectForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const allowedImageTypes = ["image/png", "image/jpeg"];

  // Ambil file gambar yang di-upload
  let selectedImageFile = projectImageInput.files[0];

  if (
    selectedImageFile &&
    !allowedImageTypes.includes(selectedImageFile.type)
  ) {
    alert("Only JPG and PNG files are allowed.");
    return;
  }

  if (selectedImageFile) {
    // Jika user meng-upload gambar
    const fileReader = new FileReader();

    // Setelah file selesai dibaca
    fileReader.onload = function () {
      const imageSource = fileReader.result; // Hasil file dibaca dalam bentuk base64/url

      addProject(createObjectData(imageSource));

      console.log("Data Project:", projectDataList);
    };

    fileReader.readAsDataURL(selectedImageFile); // Membaca file upload
  } else {
    // Jika tidak ada gambar, gunakan placeholder
    const imageSource = `http://placehold.co/600x400?text=${projectNameInput.value}`;

    addProject(createObjectData(imageSource));

    console.log("Data Project:", projectDataList);
  }
});

// Menangani klik pada tombol detail dan delete
projectContainer.addEventListener("click", function (event) {
  console.log(event);

  if (event.target.classList.contains("btn-view-details")) {
    const selectedProjectId = event.target.getAttribute("data-id");
    console.log(selectedProjectId);

    const selectedProject = projectDataList.find(
      (projectItem) => projectItem.id == selectedProjectId,
    );

    if (selectedProject) {
      document.getElementById("modalTitle").textContent = selectedProject.name;
      document.getElementById("modalImage").src = selectedProject.image;
      document.getElementById("modalDuration").textContent =
        selectedProject.duration;
      document.getElementById("modalDescription").textContent =
        selectedProject.description;

      let technologyIconsHTML = "";
      if (selectedProject.techNodeJs)
        technologyIconsHTML +=
          '<i class="fa-brands fa-node-js text-4xl p-1"></i> ';
      if (selectedProject.techNextJs)
        technologyIconsHTML +=
          '<span class="font-bold text-base p-1">Next.JS</span> ';
      if (selectedProject.techReactJs)
        technologyIconsHTML +=
          '<i class="fa-brands fa-react text-4xl p-1"></i> ';
      if (selectedProject.techTypescript)
        technologyIconsHTML +=
          '<span class="font-bold text-base p-1">TS</span> ';

      document.getElementById("modalTechnologies").innerHTML =
        technologyIconsHTML;

      // Tampilkan modal
      projectDetailModal.classList.remove("hidden");
      projectDetailModal.classList.add("flex");
    }
  } else if (event.target.classList.contains("btn-delete")) {
    // Ambil data-id dari tombol delete yang diklik
    const selectedProjectId = event.target.getAttribute("data-id");

    if (confirm("Yakin ingin menghapus Project Ini?")) {
      // Hapus project yang id-nya sesuai
      projectDataList = projectDataList.filter(
        (projectItem) => projectItem.id != selectedProjectId,
      );

      saveProjectsToLocalStorage();
      renderProjectList();
    } else {
      return;
    }
  }
});

// Menangani search Input
searchProjectInput.addEventListener("input", function (e) {
  const keyword = e.target.value.toLowerCase(); // Mengambil value pada Input dan Mengubah menjadi Lower Case

  // Kalo Keyword tidak ada Value
  if (keyword === "") {
    renderProjectList();
    return;
  } else {
    // Jika ada Value pada Keyword
    // Melakukan Filter menyesuaikan nama object yang sama dengan keyword
    const filteredObject = projectDataList.filter((projectItem) =>
      projectItem.name.toLowerCase().includes(keyword),
    );

    // Jika keyword tidak Ditemukan
    if (filteredObject.length === 0) {
      projectContainer.innerHTML = /* HTML */ `
        <h5 class="col-span-full text-center text-gray-500 w-full mt-10">
          Project tidak Ditemukan
        </h5>
      `;
      return;
    } else {
      // Jika keyword ditemukan
      projectContainer.innerHTML = "";
      filteredObject.forEach((projectItem) => {
        projectContainer.appendChild(createProjectCard(projectItem));
      });
    }
  }
});

// Menutup modal dari tombol close
closeProjectModalButton.addEventListener("click", function () {
  projectDetailModal.classList.remove("flex");
  projectDetailModal.classList.add("hidden");
});

// Menutup modal saat area luar konten modal diklik
projectDetailModal.addEventListener("click", function (event) {
  if (event.target === projectDetailModal) {
    projectDetailModal.classList.remove("flex");
    projectDetailModal.classList.add("hidden");
  }
});

// ======================================
// INITIALIZATION
// ======================================

renderProjectList();
