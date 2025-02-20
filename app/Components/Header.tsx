import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/design-files/TT Logo.png"
export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login"); // Redirect to login page
  };

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-white shadow border-b">
      {/* Logo & Title */}
      <div className="flex items-center space-x-2">
        <Image src={logo} alt="Logo" width={290} height={220} />
      </div>


  
    </header>
  );
}
