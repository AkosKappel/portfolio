import Link from "next/link";

const NavItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon?: any;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center text-gray-400 sm:text-xl rounded md:p-0 hover:text-white"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </Link>
  );
};

export default NavItem;
