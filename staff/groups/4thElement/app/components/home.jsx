function Home({token, OnLogout, OnGoToSearch}) {

    const handleLogout= event =>{
        event.preventDefault()

        OnLogout()
    }

    const handleSearch = event => {
        event.preventDefault()

        OnGoToSearch()
    }

    return <section className="home">
        

        <header className="Header">
            <section className="Header__container">
                <h2 className="Header__container--name">4thElement</h2>
                
                <a onClick={handleLogout} className="Header__container--login" href="">{token? 'Logout' : 'Login'}</a>
                
            </section>
        </header>

        <section className="Home">
            <h1>Which one do you choose?</h1>
            <img className="Home__imagen" src="" alt="" />
            <div className="Home__Selection">
                <div className="Home__Selection--surf">DIV-SURF</div>
                <div className="Home__Selection--snow">DIV-SNOW</div>
            </div>

            <div className="Home__map"></div>
        </section>

        <footer className="Footer">
            <section className="Footer__container">
                <i className="fas fa-home fa-2x"></i>
                <i onClick={handleSearch} className="fas fa-search fa-2x"></i>
                <i className="fas fa-map-marked-alt fa-2x"></i>
                <i className="fas fa-star fa-2x"></i>
            </section>
        </footer>
    </section>
}