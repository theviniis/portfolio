const Logo = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a href="/" className="logo" onClick={scrollToTop}>
      Vinícius Costa
    </a>
  )
}

export { Logo }
