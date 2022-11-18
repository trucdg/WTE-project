// Image slider for thumbnail
function imgSlider(link) {
    document.querySelector('.food').src = link;
}

// TypeIt script
new TypeIt("#typeIt-Element", {
    speed: 80,
    startDelay: 900,
})
    .type('Feeling <strong>HANGRY?</strong>', { delay: 150 })
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .delete(1)
    .pause(200)
    .type('<strong>HUNGRY?</strong>', { delay: 150 })
    .break()
    .pause()
    .type('Which dish below do you like best?', {
        speed: 100,
    })
    .go();