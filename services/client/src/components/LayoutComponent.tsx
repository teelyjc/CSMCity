import NavbarNav from "@component/navbar/NavbarNav";
import { useUser } from "@hook/userContext";

import type { ReactNode } from "react"

interface Props {
  children: ReactNode | ReactNode[];
}

export const LayoutComponent = ({ children }: Props) => {
	return (
    <>
      <main>
				<NavbarNav />
        { children }
      </main>
    </>
  )
}
