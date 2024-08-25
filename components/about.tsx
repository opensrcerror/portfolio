'use client'
/* eslint-disable react/no-unescaped-entities */

import React from 'react'
import SectionHeading from './section-heading'
import { motion } from 'framer-motion'
import { useSectionInView } from '@/lib/hooks'

export default function About() {
  const { ref } = useSectionInView('About', 1)

  return (
    <motion.section
      ref={ref}
      className="mb-10 sm:mb-28 sm:mt-14 max-w-[45rem] scroll-mt-28 text-center leading-8"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>
      <p className="mb-3">
      I’m a <span className="font-medium">skilled programmer</span> with over <span className="font-medium">3 years</span> of experience in various languages and technologies. I specialize in using <span className="font-medium">Rojo</span> for Roblox development and am passionate about <span className="font-medium">contributing to open-source projects</span>. Beyond Roblox, I’m proficient in multiple programming languages and enjoy working on <span className="font-medium">both personal and collaborative projects</span>.

      </p>
    </motion.section>
  )
}
