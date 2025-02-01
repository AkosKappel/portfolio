import Link from "next/link";

const NavItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon?: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center p-1 text-gray-400 sm:text-xl rounded md:p-0 hover:text-teal-400"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </Link>
  );
};

export default NavItem;
