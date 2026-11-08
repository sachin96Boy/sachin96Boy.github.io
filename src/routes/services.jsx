import MyServices from "../components/body-comp/MyServices";
import { pageMeta } from "../lib/seo";

export const meta = () =>
  pageMeta({
    title: "Services",
    path: "/services",
    description:
      "Web development with React, Next.js, Node.js and Python, Flutter mobile apps, 3D animation with Blender and iClone, digital portraits and game development.",
  });

export default function Services() {
  return <MyServices titleAs="h1" />;
}
