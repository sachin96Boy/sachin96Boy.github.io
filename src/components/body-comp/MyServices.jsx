import {
  TbAppWindow,
  TbBox,
  TbDeviceGamepad2,
  TbDeviceMobile,
  TbPalette,
} from "react-icons/tb";
import ItemCard from "./item-components/ItemCard";

const SERVICES = [
  {
    title: "Web Development",
    description:
      "Front-end development with React and Next.js, back-end development with Node.js and Python.",
    icon: TbAppWindow,
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile apps with Dart and Flutter.",
    icon: TbDeviceMobile,
  },
  {
    title: "3D Animation",
    description: "3D modelling and animation with Blender and iClone.",
    icon: TbBox,
  },
  {
    title: "Digital Portrait Painting",
    description: "Digital portraits and illustration with Adobe Illustrator and Photoshop.",
    icon: TbPalette,
  },
  {
    title: "Game Development",
    description: "Games with Unity and C#, and with Unreal Engine and C++.",
    icon: TbDeviceGamepad2,
  },
];

function MyServices({ titleAs: Title = "h2" }) {
  return (
    <section aria-labelledby="services-title" className="bg-surface">
      <div className="section">
        <p className="eyebrow">What I do</p>
        <Title id="services-title" className="section-title mt-2">
          My Services
        </Title>
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
          <p>
            I’m an experienced Full-Stack Web Developer skilled in JavaScript, HTML, CSS, and
            modern frameworks like React and Next.js, combined with backend technologies such as
            Node.js and Python. I specialize in building dynamic, responsive websites for small
            businesses, blogs, e-commerce platforms, and startup projects.
          </p>
          <p>
            In addition to web development, I’m also proficient in Mobile App Development using
            Flutter. I’ve developed numerous mobile applications for both solo projects and small
            businesses, focusing on performance, user experience, and clean design.
          </p>
          <p>
            My skill set also extends to the world of 3D Animation and 3D Modeling. I’ve
            successfully delivered multiple 3D projects for startups and business clients, helping
            them bring their ideas to life with high-quality visuals and animations.
          </p>
          <p>
            Whether you’re looking to build a digital presence, develop a mobile solution, or
            create stunning 3D visuals, I can help bring your vision to reality.
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.title}>
              <ItemCard {...service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default MyServices;
