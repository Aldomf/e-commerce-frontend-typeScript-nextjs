import { usePathname } from 'next/navigation';
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { BiSolidExit } from "react-icons/bi";

export function SideBar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-800 h-full w-64 pt-4 text-white flex flex-col">
      <h1 className="text-3xl font-bold text-white pl-6 pr-1">Admin Panel</h1>
      <ul className="py-4 flex-1">
        <Link href="/admin/users">
          <li
            className={`px-6 py-3 flex items-center cursor-pointer ${
              pathname === "/admin/users"
                ? "bg-gray-700 text-blue-400"
                : "hover:bg-gray-700 hover:text-blue-400"
            }`}
          >
            <PersonIcon className="mr-2" />
            <p>Users</p>
          </li>
        </Link>
        <Link href="/admin/products">
          <li
            className={`px-6 py-3 flex items-center cursor-pointer ${
              pathname === "/admin/products"
                ? "bg-gray-700 text-blue-400"
                : "hover:bg-gray-700 hover:text-blue-400"
            }`}
          >
            <ShoppingCartIcon className="mr-2" />
            <p>Products</p>
          </li>
        </Link>

        <Link href="/admin/categories">
          <li
            className={`px-6 py-3 flex items-center cursor-pointer ${
              pathname === "/admin/categories"
                ? "bg-gray-700 text-blue-400"
                : "hover:bg-gray-700 hover:text-blue-400"
            }`}
          >
            <CategoryIcon className="mr-2" />
            <p>Categories</p>
          </li>
        </Link>

        <Link href="/admin/orders">
          <li
            className={`px-6 py-3 flex items-center cursor-pointer ${
              pathname === "/admin/orders"
                ? "bg-gray-700 text-blue-400"
                : "hover:bg-gray-700 hover:text-blue-400"
            }`}
          >
            <LocalShippingIcon className="mr-2" />
            <p>Orders</p>
          </li>
        </Link>

        <Link href="/">
          <li
            className={`px-6 py-3 flex items-center cursor-pointer hover:bg-gray-700 hover:text-red-400`}
          >
            <BiSolidExit className="mr-2 w-6 h-6" />
            <p>Exit</p>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

