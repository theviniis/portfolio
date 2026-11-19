import { AnimatedHeight } from './shared/components/AnimatedHeight'
import { useInView } from 'react-intersection-observer'
import { ProjectStackCard } from './shared/components/ProjectStackCard'
import * as m from 'motion/react-m'

import { useReducedMotion } from 'motion/react'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { ProjectPreview } from './shared/components/ProjectPreview'

import { useTranslation } from 'react-i18next'

import {
  Mail,
  Briefcase,
  FileText,
  Sparkles,
  Menu,
  Code,
  Layers,
  Accessibility,
  Braces,
  Monitor,
  Check
} from 'lucide-react'

import profile from './assets/profile.webp'

import ptProjects from './data/translations/projects/pt-BR.json'

import enProjects from './data/translations/projects/en-US.json'

import ptExperience from './data/translations/experience/pt-BR.json'

import enExperience from './data/translations/experience/en-US.json'

import { getCvForLang } from './shared/lib/cv'

import { useDocumentMeta } from './shared/hooks/useDocumentMeta'

import './css/redesign.css'

function Portfolio() {
  const { i18n } = useTranslation()

  const en = !i18n.language.startsWith('pt')

  const text = (pt: string, eng: string) => (en ? eng : pt)

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    // Preserve direct section links, but always open the home page at the top.
    if (!window.location.hash)
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])
  const [hasScrolled, setHasScrolled] = useState(false)
  const { ref: projectsRevealRef, inView: projectsVisible } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -80px 0px'
  })
  useEffect(() => {
    const reveal = () => {
      if (window.scrollY > 4) {
        setHasScrolled(true)
        window.removeEventListener('scroll', reveal)
      }
    }
    window.addEventListener('scroll', reveal, { passive: true })
    reveal()
    return () => window.removeEventListener('scroll', reveal)
  }, [])
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    const update = () => {
      const sections = [
        ...document.querySelectorAll<HTMLElement>('main section[id]')
      ]

      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2

      setActive(
        atBottom
          ? 'contato'
          : (sections

              .filter((section) => section.getBoundingClientRect().top <= 160)

              .at(-1)?.id ?? 'inicio')
      )
    }

    update()

    window.addEventListener('scroll', update, { passive: true })

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)

      window.removeEventListener('resize', update)
    }
  }, [])

  const reduceMotion = useReducedMotion()

  const [universe, setUniverse] = useState(true)
  const heroInteracted = useRef(false)
  const [portraitFlipped, setPortraitFlipped] = useState(false)
  useEffect(() => {
    if (reduceMotion || hasScrolled) return
    const timer = window.setTimeout(
      () => {
        if (!document.hidden && window.scrollY <= 4) setPortraitFlipped((value) => !value)
      },
      portraitFlipped ? 3000 : 6000
    )
    return () => window.clearTimeout(timer)
  }, [portraitFlipped, reduceMotion, hasScrolled])

  const orbiting = universe && !reduceMotion

  const stickerPositions = [
    [-0.99, -0.42],
    [0.92, -0.46],
    [-0.71, 0.71],
    [0.91, 0.5],
    [-0.42, -0.91],
    [0.32, 0.95]
  ]
  const orbits = stickerPositions.map(([x, y]) => [x * 57.5, y * 57.5])
  const [hovered, setHovered] = useState<string | null>(null)

  const [menu, setMenu] = useState(false)

  const navRef = useRef<HTMLElement>(null)

  const [highlight, setHighlight] = useState({
    x: 0,

    y: 0,

    width: 0,

    height: 0
  })

  useLayoutEffect(() => {
    const nav = navRef.current

    if (!nav) return

    const measure = () => {
      const link = nav.querySelector<HTMLElement>(
        `[href="#${hovered ?? active}"]`
      )

      if (link)
        setHighlight({
          x: link.offsetLeft,

          y: link.offsetTop,

          width: link.offsetWidth,

          height: link.offsetHeight
        })
    }

    measure()

    const observer = new ResizeObserver(measure)

    observer.observe(nav)

    return () => observer.disconnect()
  }, [active, hovered, menu, en])

  const enter = (delay: number) => ({
    initial: reduceMotion ? (false as const) : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.65,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const
    }
  })
  const gestures = {
    whileHover: reduceMotion ? undefined : { scale: 1.035, y: -1 },

    whileTap: reduceMotion ? undefined : { scale: 0.97 },

    transition: { duration: 0.18 }
  }

  const [more, setMore] = useState(false)

  const [career, setCareer] = useState(false)

  useDocumentMeta()

  const projects = (en ? enProjects : ptProjects).projects.list

  const experiences = (en ? enExperience : ptExperience).experience.experiences

  const cv = getCvForLang(i18n.language)

  const nav = [
    ['inicio', text('Início', 'Home')],

    ['projetos', text('Projetos', 'Projects')],

    ['experiencia', text('Experiência', 'Experience')],

    ['sobre', text('Sobre', 'About')],

    ['contato', text('Contato', 'Contact')]
  ]

  return (
    <>
      <m.header
        className="floating-nav"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.12 }}
      >
        <m.button
          {...gestures}

          className="mobile-menu"

          aria-label="Menu"

          aria-expanded={menu}

          onClick={() => setMenu(!menu)}
        >
          <Menu size={20} />
        </m.button>

        <nav
          ref={navRef}

          className={menu ? 'is-open' : ''}

          onMouseLeave={() => setHovered(null)}

          aria-label={text('Menu principal', 'Main navigation')}
        >
          <m.span
            aria-hidden="true"

            className="nav-highlight"

            initial={false}

            animate={highlight}

            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 380, damping: 35, mass: 0.7 }
            }
          />

          {nav.map(([id, label]) => (
            <m.a
              key={id}

              animate={{
                color:
                  (hovered ?? active) === id
                    ? 'rgb(10, 10, 11)'
                    : 'rgb(154, 154, 162)'
              }}

              transition={{ duration: reduceMotion ? 0 : 0.22 }}

              onMouseEnter={() => setHovered(id)}

              onFocus={() => setHovered(id)}

              onBlur={() => setHovered(null)}

              href={`#${id}`}

              aria-current={active === id ? 'location' : undefined}

              onClick={() => setMenu(false)}
            >
              <span className="nav-label">{label}</span>
            </m.a>
          ))}
        </nav>
      </m.header>

      <main className="portfolio">
        <section id="inicio" className="intro">
          <m.h1 {...enter(0.3)}>
            {text('Oi, eu sou o', 'Hi, I’m')} <strong>Vinícius</strong>
          </m.h1>

          <m.p {...enter(0.44)}>
            {text('Desenvolvedor Front-end', 'Front-end Developer')}
            <br />
            React · TypeScript · Next.js
          </m.p>

          <m.div
            className="portrait-stage"

            onPointerLeave={() => {
              if (heroInteracted.current) setUniverse(false)
            }}
          >
            <m.div
              className="universe-halo"
              aria-hidden="true"
              animate={{
                opacity: orbiting ? 1 : 0,
                scale: orbiting ? 1.15 : 0.85
              }}
              transition={{ duration: 0.7 }}
            />
            <m.div
              className="portrait"

              onPointerEnter={(event) => {
                if (event.pointerType !== 'touch') {
                  heroInteracted.current = true
                  setUniverse(true)
                }
              }}

              initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: orbiting ? 1.025 : 1 }}

              transition={{ type: 'spring', stiffness: 150, damping: 22 }}
            >
              <div className="portrait-perspective">
                <m.button
                  className="portrait-flip"
                  type="button"
                  aria-label={text(
                    'Virar retrato de Vinícius Costa',
                    'Flip portrait of Vinícius Costa'
                  )}
                  aria-pressed={portraitFlipped}
                  onClick={() => setPortraitFlipped((value) => !value)}
                  animate={{ rotateY: portraitFlipped ? 180 : 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 100, damping: 17 }
                  }
                >
                  <span
                    className="portrait-face portrait-front"
                    aria-hidden={portraitFlipped}
                  >
                    <img
                      src={profile}
                      alt="Vinícius Costa"
                      fetchPriority="high"
                    />
                  </span>
                  <span
                    className="portrait-face portrait-back"
                    aria-hidden={!portraitFlipped}
                  >
                    <m.span
                      className="portrait-arrow"
                      animate={
                        portraitFlipped && !reduceMotion
                          ? { y: [0, 6, 0] }
                          : { y: 0 }
                      }
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      ↓
                    </m.span>
                    <span>
                      {text('ROLE PARA VER O CONTEÚDO', 'SCROLL TO EXPLORE')}
                    </span>
                  </span>
                </m.button>
              </div>

              <svg viewBox="0 0 300 300" aria-hidden="true">
                <defs>
                  <path
                    id="circle"

                    d="M150,150 m-136,0 a136,136 0 1,1 272,0 a136,136 0 1,1 -272,0"
                  />
                </defs>

                <text>
                  <textPath href="#circle">
                    {text(
                      'FRONT-END · INTERFACES · ACESSIBILIDADE · REACT · ',

                      'FRONT-END · INTERFACES · ACCESSIBILITY · REACT · '
                    )}
                  </textPath>
                </text>
              </svg>
            </m.div>

            {[Code, Layers, Accessibility, Braces, Monitor, Check].map(
              (Icon, index) => (
                <m.span
                  key={index}
                  className="sticker-entrance"
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -orbits[index][0] * 1.4,
                          y: -orbits[index][1],
                          rotate: index % 2 ? -10 : 10,
                          filter: 'blur(5px)'
                        }
                  }
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    filter: 'blur(0px)'
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.6,
                    delay: reduceMotion
                      ? 0
                      : 0.68 + [0, 2, 1, 3, 4, 5][index] * 0.14,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <m.span
                    initial={false}

                    animate={{
                      x: orbiting ? (index === 4 ? -70 : orbits[index][0]) : 0,

                      y: orbiting ? (index === 4 ? 8 : orbits[index][1]) : 0,

                      scale: orbiting ? 1.1 : 1,

                      rotate: index === 3 || index === 4 ? 12 : -12
                    }}

                    transition={{
                      type: 'spring',

                      stiffness: 70,

                      damping: 20,

                      mass: 1
                    }}

                    className={`sticker-anchor sticker-${index}`}
                    style={{
                      left: `calc(50% + var(--orbit-radius) * ${stickerPositions[index][0] * 0.9})`,
                      top: `calc(50% + var(--orbit-radius) * ${stickerPositions[index][1] * 0.9})`,
                      right: 'auto',
                      bottom: 'auto'
                    }}
                    aria-hidden="true"
                  >
                    <m.span
                      className={`sticker sticker-${index}`}

                      animate={
                        orbiting
                          ? { y: [null, -6, 4, 0], rotate: [null, 5, -4, 0] }
                          : { y: 0, rotate: 0 }
                      }

                      transition={
                        orbiting
                          ? {
                              duration: 6 + index * 0.6,

                              repeat: Infinity,

                              ease: 'easeInOut'
                            }
                          : { duration: 0.6, ease: 'easeOut' }
                      }
                    >
                      <Icon strokeWidth={1.7} />
                    </m.span>
                  </m.span>
                </m.span>
              )
            )}
          </m.div>
        </section>

        <m.section
          id="projetos"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          ref={projectsRevealRef}
          animate={{
            opacity: reduceMotion || (hasScrolled && projectsVisible) ? 1 : 0,
            y: reduceMotion || (hasScrolled && projectsVisible) ? 0 : 24
          }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
        >
          <h2>{text('Projetos em destaque', 'Featured projects')}</h2>

          <AnimatedHeight overflow="clip">
            <div className="project-list" id="project-list">
              {projects
                .slice(0, more ? projects.length : 4)
                .map((project, index, visibleProjects) => (
                  <ProjectStackCard
                    key={project.name}
                    index={index}
                    last={index === visibleProjects.length - 1}
                  >
                    <div>
                      <div className="tags project-technologies">
                        {project.skills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>

                      <h3>{project.name}</h3>

                      <p>{project.description}</p>

                      <div className="actions">
                        <m.a
                          {...gestures}

                          className="pill"

                          href={project.deployUrl}

                          target="_blank"

                          rel="noreferrer"
                        >
                          {text('Ver projeto', 'View project')} ↗
                        </m.a>

                        <m.a
                          {...gestures}

                          href={project.githubUrl}

                          target="_blank"

                          rel="noreferrer"
                        >
                          GitHub ↗
                        </m.a>
                      </div>
                    </div>

                    <ProjectPreview
                      src={project.deployUrl}

                      name={project.name}

                      en={en}
                    />
                  </ProjectStackCard>
                ))}
            </div>
          </AnimatedHeight>

          <div className="projects-toggle">
            <m.button
              {...gestures}

              className="outline-pill"

              aria-expanded={more}
              aria-controls="project-list"

              onClick={() => setMore(!more)}
            >
              {more
                ? text('Ver menos', 'Show less')
                : text('Ver mais projetos', 'More projects')}
            </m.button>
          </div>
        </m.section>

        <m.section
          id="experiencia"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -64px 0px' }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <h2>{text('Experiência e trajetória', 'Experience & journey')}</h2>

          <AnimatedHeight>
            <div className="career-list" id="career-timeline">
              {experiences

                .slice(0, career ? experiences.length : 3)

                .map((item) => (
                  <article className="career-entry" key={item.company}>
                    <div className="career-date">
                      {item.period.start} — {item.period.end}
                    </div>
                    <div className="career-card">
                      <span className="career-dot" aria-hidden="true" />
                      <h3>{item.company}</h3>
                      <h4>{item.role}</h4>
                      <p className="career-summary">
                        {item.responsibilities[0]}
                      </p>
                    </div>
                  </article>
                ))}
            </div>
          </AnimatedHeight>

          <div className="career-toggle">
            <m.button
              {...gestures}

              className="outline-pill"

              aria-expanded={career}
              aria-controls="career-timeline"

              onClick={() => setCareer(!career)}
            >
              {career
                ? text('Ver menos', 'Show less')
                : text('Ver mais', 'Show more')}
            </m.button>
          </div>
        </m.section>

        <m.section
          id="sobre"
          className="about-section"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -64px 0px' }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <div>
            <h2>{text('Sobre mim', 'About me')}</h2>

            <p>
              {text(
                'Sou desenvolvedor front-end em Rio Grande, RS. Construo e evoluo aplicações web com React, TypeScript e Next.js, com experiência em produtos SaaS B2B.',

                'I’m a front-end developer based in Rio Grande, Brazil. I build and evolve web applications with React, TypeScript and Next.js, with experience in B2B SaaS products.'
              )}
            </p>

            <p>
              {text(
                'Gosto de colaborar com equipes multidisciplinares para transformar necessidades de negócio em interfaces acessíveis, consistentes e fáceis de manter. Componentes reutilizáveis, testes e performance fazem parte desse trabalho.',

                'I enjoy collaborating with multidisciplinary teams to turn business needs into accessible, consistent and maintainable interfaces. Reusable components, testing and performance are part of that work.'
              )}
            </p>

            <ul className="about-details">
              <li>
                <Mail size={19} aria-hidden="true" />

                <a href="mailto:vinicius.dsc95@gmail.com">
                  <strong>{text('E-mail', 'Email')}:</strong>

                  <span>vinicius.dsc95@gmail.com</span>
                </a>
              </li>

              <li>
                <Briefcase size={19} aria-hidden="true" />

                <a
                  href="https://www.linkedin.com/in/viniis/"

                  target="_blank"

                  rel="noreferrer"
                >
                  <strong>LinkedIn:</strong>

                  <span>in/viniis</span>
                </a>
              </li>

              <li>
                <FileText size={19} aria-hidden="true" />

                <a href={cv.url} download={cv.filename}>
                  <strong>
                    {text('Currículo profissional', 'Professional résumé')}
                  </strong>

                  <span>{text('Baixar em PDF', 'Download PDF')}</span>
                </a>
              </li>
            </ul>

            <m.a
              {...gestures}

              className="pill"

              href={cv.url}

              download={cv.filename}
            >
              {text('Baixar currículo', 'Download résumé')} ↗
            </m.a>
          </div>

          <div className="about-photo-slot">
            <m.figure
              className="about-photo"
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={1}
              dragMomentum={false}
              dragSnapToOrigin
              dragTransition={{
                bounceStiffness: reduceMotion ? 600 : 180,
                bounceDamping: reduceMotion ? 60 : 22
              }}
              whileDrag={{
                scale: reduceMotion ? 1 : 1.035,
                rotate: reduceMotion ? -4 : 2,
                cursor: 'grabbing',
                zIndex: 5
              }}
              initial={false}
              animate={{ rotate: -4, scale: 1 }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      rotate: 0,
                      scale: 1.035,
                      boxShadow: '0 12px 28px rgba(0,0,0,0.10)'
                    }
              }
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            >
              <span className="photo-tape" aria-hidden="true" />

              <img
                src={profile}
                alt="Vinícius Costa"
                loading="lazy"
                draggable={false}
              />

              <figcaption>
                {text(
                  'Interfaces bem pensadas começam com boas perguntas.',
                  'Thoughtful interfaces start with good questions.'
                )}
              </figcaption>
            </m.figure>
            <Sparkles className="photo-sparkles" aria-hidden="true" />
          </div>
        </m.section>

        <m.section
          id="contato"
          className="contact-section"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -64px 0px' }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <div className="contact-illustration" aria-hidden="true">
            <div className="chat-bubble">
              {[0, 1, 2].map((dot) => (
                <m.i
                  key={dot}
                  animate={
                    reduceMotion
                      ? { y: 0, backgroundColor: 'var(--chat-dot)' }
                      : {
                          y: [0, -7, 0, 0],
                          backgroundColor: [
                            'var(--chat-dot)',
                            'var(--chat-dot-active)',
                            'var(--chat-dot)',
                            'var(--chat-dot)'
                          ]
                        }
                  }
                  transition={{
                    duration: 1.35,
                    times: [0, 0.2, 0.4, 1],
                    repeat: Infinity,
                    delay: dot * 0.16,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
            <span />
          </div>
          <div className="contact-copy">
            <h2>{text('Vamos trabalhar juntos?', 'Let’s work together?')}</h2>
            <p>
              {text(
                'Para oportunidades em front-end, projetos web ou uma conversa sobre tecnologia.',
                'For front-end opportunities, web projects or a conversation about technology.'
              )}
            </p>
            <div className="contact-actions">
              <m.a
                {...gestures}
                href="https://www.linkedin.com/in/viniis/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </m.a>
              <m.a {...gestures} href="mailto:vinicius.dsc95@gmail.com">
                {text('E-mail', 'Email')}
              </m.a>
              <m.a
                {...gestures}
                href="https://github.com/theviniis/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </m.a>
              <m.a
                {...gestures}
                href="https://wa.me/5511987372296"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </m.a>
            </div>
          </div>
        </m.section>
      </main>

      <footer>Vinícius Costa © {new Date().getFullYear()}</footer>
    </>
  )
}

export default function App() {
  return <Portfolio />
}
