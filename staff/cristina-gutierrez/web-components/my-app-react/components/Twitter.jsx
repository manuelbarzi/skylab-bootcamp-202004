class Twitter extends Component {
    componentDidMount() {
        !this.props.tweets && retrieveTweets(this.props.email, (error, tweets) => {
            if (error) throw error

            this.props.onTweets(tweets)
        })
    }

    render() {
        return <section className="Twitter">
            <h2>Twitter</h2>

            {this.props.tweets && <ul>
                {this.props.tweets.map(({ tweet, date }) =>
                    <li>
                        <date>{date}</date>
                        <p>{tweet}</p>
                    </li>
                )}
            </ul>}
        </section>
        // <Tweet />
    }
}