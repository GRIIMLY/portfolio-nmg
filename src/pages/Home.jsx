import HeroSection       from '../components/sections/HeroSection'
import AboutSection      from '../components/sections/AboutSection'
import SkillsSection     from '../components/sections/SkillsSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import EducationSection  from '../components/sections/EducationSection'
import ProjectsSection   from '../components/sections/ProjectsSection'
import ContactSection    from '../components/sections/ContactSection'
import { useConfig } from '../hooks/useSupabase'

export default function Home() {
  const { data: visibility, loading: visLoading } = useConfig('visibility')
  const showProjects = visLoading || visibility?.show_projects !== false

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      {showProjects && <ProjectsSection />}
      <ContactSection />
    </>
  )
}
