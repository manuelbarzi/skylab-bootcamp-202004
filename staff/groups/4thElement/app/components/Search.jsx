const { useState } = React

function Search({ movingSurfForecast, sportState, token }) {

    const [query, setQuery] = useState('')
    const [selectorState, setselectorState] = useState('spots')

    

    const handleSubmitSpot = (query) =>{
        setQuery(query)
    }

    const onGoToSurfForecast = (surfForecastSelected) =>{
        movingSurfForecast(surfForecastSelected)
    }

    const handleChangeSelector = (val) => {
        setselectorState(val)
    }

    return <section className="Search">
        <SearchInput onSubmitSpot={handleSubmitSpot} searchSelector={handleChangeSelector} selectorState={selectorState} sportState={sportState}/>
        {query && <SearchResults  query={query} onGoToSurfForecast={onGoToSurfForecast} sportState={sportState} selectorState={selectorState} token={token}/>}

    </section>
}