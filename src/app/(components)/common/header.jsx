'use client'
import { useRouter } from "next/navigation"
import "./header.css"

export default function Header () {
  const router = useRouter()
  const goHome = () => {
    router.replace('/')
  }

  return (
    <header className="header">
      <section className="header__front">
        <button className="header__button" onClick={goHome}>
          <img className="header--logo" src="../logo.png" alt="로고" />
        </button>
      </section>
      <section className="header__middle">
        {/* <button className="header__button">메뉴1</button>
        <button className="header__button">메뉴2</button>
        <button className="header__button">메뉴3</button> */}
      </section>
      {/* <section className="header__back">
        바텀
      </section> */}
    </header>
  )
}