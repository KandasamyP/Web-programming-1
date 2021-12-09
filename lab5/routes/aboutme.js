const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.status(200).json({
            "name": "Kandasamy Parthasarathy",
            "cwid": "10473056",
            "biography": "Doing my CS graduate at Stevens, I did my undergraduate in CS after that I was Intern in MNC IT company and then started with my full-time professional working experience in an MNC company, worked on various technologies like Java, JavaScript, TypeScript, Angular, React in Agile methodology in various projects, have created many web applications using Front-end technology. Have worked in Netherlands (Europe) for quite a year, have visited many places. \n I love to play tennis when I have free time and like to learn new concept and technologies",
            "favoriteShows": ["Batman Trilogy", "Suites", "Dark", "Friends"]
        });
        return;
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});

module.exports = router;