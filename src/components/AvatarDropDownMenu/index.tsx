import * as Avatar from "@radix-ui/react-avatar"
import * as Menubar from "@radix-ui/react-menubar"
import Link from "next/link"
import {
  AvatarImage,
  AvatarRoot,
  LogOut,
  LogoutItem,
  MenuBarLogoutContainer,
  MenuHeader,
  MenubarContent,
  MenubarItem,
  MenubarTrigger,
} from "./styles"
import {
  faAddressCard,
  faArrowRightFromBracket,
  faBriefcase,
  faBug,
  faChartColumn,
  faChevronUp,
  faGear,
  faGraduationCap,
  faMedal,
  faTableColumns,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AuthContext } from "@/contexts/AuthContext"
import { useContext, useEffect, useState } from "react"

import router from "next/router"
import Image from "next/image"
import { UserContext } from "@/contexts/UserContext"
import { ArrowDown2, Logout } from "iconsax-react"

export function AvatarDropDownMenu() {
  const { signOut } = useContext(AuthContext)
  const { name, avatarUrl, userAllowed } = useContext(UserContext)
  const [userData, setUserData] = useState({ name, avatarUrl })
  // useEffect(() => {
  //   async function fetchUserData() {
  //     const token = getToken();
  //     if (token) {
  //       try {
  //         const userData = await getUserData(token);
  //         setUserData(userData);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     }
  //   }

  //   fetchUserData();
  // }, []);

  function handleSignOut() {
    signOut()
  }

  function handleLogoutConfirmation() {
    if (confirm("Deseja realmente sair?")) {
      handleSignOut()
    }
  }

  return (
    <Menubar.Root>
      <Menubar.Menu>
        <MenubarTrigger>
          <AvatarRoot>
            {userData?.avatarUrl && (
              <Image
                src={userData?.avatarUrl}
                alt='Avatar'
                width={480}
                height={480}
                quality={99}
                style={{
                  width: "2rem",
                  height: "2rem",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                priority
              />
            )}
          </AvatarRoot>
          <ArrowDown2 />
        </MenubarTrigger>

        <Menubar.Portal>
          <MenubarContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                width: "100%",
              }}
            >
              <MenubarItem onClick={() => router.push("/Perfil")}>Meu perfil</MenubarItem>
              {userAllowed && <MenubarItem onClick={() => router.push("/Adm")}>Adm</MenubarItem>}
            </div>
            <LogOut onClick={handleLogoutConfirmation}>
              <Logout/>
              Sair</LogOut>
          </MenubarContent>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  )
}
