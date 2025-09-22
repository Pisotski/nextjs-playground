import Button from "@/ui/common/Button";
import CustomLink from "@/ui/common/CustomLink";

export default function Sidebar() {
  const menu = [
    {
      linkName: "Text Comparison",
      route: "/dashboard/text-comparison",
    },
    {
      linkName: "Chat",
      route: "/dashboard/chat",
    },
    {
      linkName: "Home",
      route: "/dashboard",
    },
  ];
  return (
    <div className="flex flex-col pt-2 gap-2 w-full items-center">
      {menu.map((menuItem) => (
        <CustomLink key={menuItem.route} linkProps={menuItem} />
      ))}
    </div>
  );
}
