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
 * Fallback social links, shown until the Firebase `social` data arrives (or if it fails).
 * Keys match the normalized data from src/lib/firebaseData.js.
 */
export const fallbackSocial = {
  facebook: "https://www.facebook.com/Sachin96boy",
  linkedin: "https://www.linkedin.com/in/sachin96boy/",
  twitter: "https://www.twitter.com/sachin96boy",
  github: "https://www.github.com/Sachin96Boy",
};
