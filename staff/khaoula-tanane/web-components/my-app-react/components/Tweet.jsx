function Tweet({tweet}){

    const {username, text, date} = tweet

    return(
        <>
        <section>
        <h3>Your latest Tweet </h3>
         <p>{`${username} tweeted: ${text} ${date.toString().slice(4,21)}`}</p> 
        </section>
        </>
    )
}