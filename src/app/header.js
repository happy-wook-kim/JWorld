import "./header.css"

export default function Header () {



  return (
    <header className="header">
      <section className="header__front">
        <button>
          <img className="header--logo" src="../logo.png" alt="로고" />
        </button>
      </section>
      <section className="header__middle">
        <span>메뉴1</span>
        <span>메뉴2</span>
        <span>메뉴3</span>
      </section>
      <section className="header__back">
        바텀
      </section>
    </header>
  )
}