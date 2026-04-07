// Ambil Container
const techCardContainer = document.getElementById("techCardContainer");
console.log(techCardContainer);

const tailwindLogo = `<img src="/images/tailwind.svg" width='30"' alt="" />`;

const techStack = [
  {
    icon: '<i class="fa-brands fa-html5 text-3xl"></i>',
    techName: "HTML",
  },
  {
    icon: '<i class="fa-brands fa-css3 text-3xl"></i>',
    techName: "CSS",
  },
  {
    icon: '<i class="fa-brands fa-js text-3xl"></i>',
    techName: "JavaScript",
  },
  {
    icon: tailwindLogo,
    techName: "Tailwind",
  },
  {
    icon: '<i class="fa-brands fa-python text-3xl"></i>',
    techName: "Python",
  },
  {
    icon: '<i class="fa-brands fa-node-js text-3xl"></i>',
    techName: "Node.JS",
  },
];

techCardContainer.innerHTML = techStack
  .map(
    (stack) => /* HTML */ `
      <div
        class="flex gap-3 item-center bg-gray-800 text-lg font-semibold justify-center p-3 rounded-lg hover:-translate-y-2 duration-300 transition-all"
      >
        ${stack.icon}
        <p>${stack.techName}</p>
      </div>
    `,
  )
  .join("");
