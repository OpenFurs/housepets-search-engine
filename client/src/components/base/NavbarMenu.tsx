"use client"

import Link from "next/link"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { FaGithub } from "react-icons/fa6"
import {
  LuBookMarked,
  LuCat,
  LuExternalLink,
  LuInfo,
  LuMenu,
  LuSearch
} from "react-icons/lu"
import { Button } from "../Button"
import TransitionWrapper from "../TransitionWrapper"
import type { IconType } from "react-icons"
import { cn } from "@/utils"
import { useIsExactRoute } from "@/hooks"
import { SiFandom } from "react-icons/si"

export default function NavbarMenu() {
  const menuItems = [
    { icon: LuSearch, label: "Search" },
    { icon: LuCat, label: "Characters" },
    { icon: LuBookMarked, label: "Chapter Arcs", link: "/arcs" },
    { icon: LuInfo, label: "About Searchpets", link: "/about" }
  ]

  const externalItems = [
    {
      label: "Official Housepets! site",
      link: "https://www.housepetscomic.com"
    },
    {
      icon: SiFandom,
      label: "Housepets! Fandom Wiki",
      link: "https://housepetscomic.fandom.com/wiki/Housepets!_Wiki"
    }
  ]

  const ItemLinks = ({
    icon: Icon,
    link,
    label
  }: {
    icon?: IconType
    link?: string
    label: string
  }) => {
    const parsedLink = link ?? `/${label.toLowerCase()}`
    const isMatchingPath = useIsExactRoute(parsedLink)

    const ICON_SIZE = 19

    return (
      <MenuItem
        as={Link}
        href={parsedLink}
        target={link?.startsWith("https") ? "_blank" : undefined}
        rel={link?.startsWith("https") ? "noopenner noreferrer" : undefined}
        className={cn(
          !isMatchingPath
            ? "data-[active]:bg-purple-600 data-[active]:text-white"
            : "bg-purple-600 text-white",
          "flex gap-x-2 items-center px-4 py-2.5"
        )}
      >
        {Icon ? <Icon size={ICON_SIZE} /> : <LuExternalLink size={ICON_SIZE} />}
        <span className="whitespace-nowrap">{label}</span>
      </MenuItem>
    )
  }

  return (
    <Menu as="div" className="relative z-10">
      <MenuButton as={Button} icon={<LuMenu size={19} />} variant="tritery" />
      <TransitionWrapper>
        <MenuItems
          anchor="bottom start"
          modal={false}
          className="absolute z-10 translate-y-3 overflow-hidden bg-white rounded-md shadow-md border border-purple-600 flex flex-col"
        >
          {menuItems.map((item, i) => (
            <ItemLinks
              key={i}
              label={item.label}
              link={item.link}
              icon={item.icon}
            />
          ))}
          <div className="my-2 flex-shrink-0 border-b border-gray-400 mx-3" />
          <ItemLinks
            icon={FaGithub}
            label="View source code"
            link="https://github.com/fusky-labs/searchpets"
          />
          <div className="my-2 flex-shrink-0 border-b border-gray-400 mx-3" />
          {externalItems.map((item) => (
            <ItemLinks
              key={item.link}
              label={item.label}
              link={item.link}
              icon={item.icon}
            />
          ))}
        </MenuItems>
      </TransitionWrapper>
    </Menu>
  )
}