const express = require('express')
const router = express.Router()
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

let videos = require('../data/videos.json');


const saveVideosToFile = () => {
  fs.writeFileSync('./data/videos.json', JSON.stringify(videos, null, 2));
};

router.get('/', (req, res) => {
  const videoSummaries = videos.map(video => ({
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image
  }));
  res.json(videoSummaries)
});

router.get('/:id', (req, res) => {
  const video = videos.find(video => video.id === req.params.id)
  if (video) {
    res.json(video)
  } else {
    res.status(404).send('Video not found')
  }
});

router.post('/', (req, res) => {
  try {
    const { title, description, image } = req.body
    if (!title || !description || !image) {
      throw new Error('Missing required fields')
    }
    const newVideo = {
      id: uuidv4(),
      title,
      description,
      image,
      channel: 'New Channel'
    };
    videos.push(newVideo)
    saveVideosToFile()
    res.status(201).json(newVideo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});

router.delete('/:id', (req, res) => {
  videos = videos.filter(video => video.id !== req.params.id)
  saveVideosToFile()
  res.status(204).send()
});

module.exports = router;
