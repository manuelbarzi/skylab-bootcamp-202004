module.exports = body => {
    return `<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <link rel="stylesheet" href="style.css"> 
    </head>
    <body>
    <nav class="landing">
    <ul class="contacts">
        <li>
            <a class="contacts__add" href="localhost:8080/add-contact">ADD</a>
        </li>
        <li>
            <a class="contacts__list" href="localhost:8080/list-contacts">LIST</a>
        </li>
        <li>
            <a class="contacts__search" href="localhost:8080/search">SEARCH</a>
        </li>
        <li>
            <a class="contacts__detail" href="localhost:8080/detail">DETAIL</a>
        </li>
    </ul>
</nav>
        ${body}
    </body>
</html>
`
}