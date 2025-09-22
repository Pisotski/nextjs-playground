import Link from "next/link";

type CustomLinkTypes = {
  linkProps: {
    linkName: string;
    route: string;
  };
};
export default function CustomLink({
  linkProps: { linkName, route },
}: CustomLinkTypes) {
  return (
    <Link
      href={route}
      className="w-2/3 border bg-amber-700 rounded-md px-4 py-2"
    >
      {linkName}
    </Link>
  );
}
