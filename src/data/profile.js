/** Single source of truth for profile content shown in the sidebar, mobile drawer and hero. */
export const profile = {
  name: "Sachin Supunthaka",
  handle: "Sachin96Boy",
  roles: ["Full Stack Web and Mobile App Developer", "Freelance 3D Animator"],
  heroRoles: ["Web Developer", "Mobile App Developer", "3D Animator"],
  email: "sachinsupunthaka96@gmail.com",
  education: {
    degree: "BSc in Computer Science",
    school: "Wayamba University of Sri Lanka",
  },
  country: "Sri Lanka",
  languages: ["English", "Sinhala"],
};

export const mailto = `mailto:${profile.email}`;

/**
 * Fallback social links, used until (or if) the Firebase `social.json` request fails.
 * Keys match the database (`linkdin` is spelled that way in the DB).
 */
export const fallbackSocial = {
  facebook: "https://www.facebook.com/Sachin96boy",
  linkdin: "https://www.linkedin.com/in/sachin96boy/",
  twitter: "https://www.twitter.com/sachin96boy",
  github: "https://www.github.com/Sachin96Boy",
};
