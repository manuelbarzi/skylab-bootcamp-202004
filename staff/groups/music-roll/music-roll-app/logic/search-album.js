function searchAlbum(token, query, callback) {
  debugger;

  const queryUrl = encodeURI(query).concat(`&type=album&offset=0&limit=5`);

  call(
    "GET",
    `https://api.spotify.com/v1/search?q=${queryUrl}`,
    undefined,
    { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    (error, status, body) => {
      if (error) console.log(error);
      debugger;
      if (status === 200) {
        const results = [],
          artistsArray = [];

        const {
          albums: { items },
        } = JSON.parse(body);

        for (let i = 0; i < items.length; i++) {
          let {
            images: [, { url: image }],
            id,
            name,
            artists,
          } = items[i];
          debugger;

          for (let j = 0; j < artists.length; j++) {
            artistsArray.push(artists[j].name);
          }
          let object = { image, id, name, artistsArray };
          results.push(object);
        }
        debugger;
        callback(undefined, results);
      }
    }
  );
}