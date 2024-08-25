import osgllogo from '@/public/osgllogo.svg'
import discord from '@/public/discord.svg'
import git from '@/public/Octicons-mark-github.svg'

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Projects',
    hash: '#projects',
  },
  {
    name: 'Skills',
    hash: '#skills',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const

export const projectsData = [
  {
    title: 'OSGL',
    description:
      'I contributed to OSGL, an source graphics-library, like SFML, that allows you to draw pixels, images, and even videos!',
    tags: ['Rojo', 'LuaU'],
    imageUrl: osgllogo,
    url: 'https://github.com/Gunshot-Sound-Studios/osgl-graphics',
  },
  {
    title: 'Discord.Luau',
    description:
      'The entire Discord.js library, in Luau. Allows you to connect a discord bot to Roblox, allowing slash commands, custom statuses, roles, and more!',
    tags: ['Typescript', 'LuaU', 'Rojo'],
    imageUrl: discord,
    url: ""
  },
] as const

export type ContactLabelData = (typeof contactsData)[number]
export const contactsData = [
  {
    name: 'Discord',
    text: '@opensrcerror',
    icon: discord,
    url: 'https://discord.com/users/1180579582391369798',
  },
  {
    name: 'Github',
    text: '@opensrcerror',
    icon: git,
    url: 'https://github.com/opensrcerror',
  },
] as const

type LinkTuple = [string, string?]
export const skillsData: LinkTuple[] = [
  ['Rojo', 'https://rojo.space/'],
  ['Wally', 'https://wally.run/'],
  ['TypeScript', 'https://www.typescriptlang.org/'],
  ['JavaScript', undefined],
  ['React', 'https://react.dev/'],
  ['Lua', undefined],
  ['LuaU', 'https://luau-lang.org/'],
  ['Github', 'https://github.com/'],
] as const
