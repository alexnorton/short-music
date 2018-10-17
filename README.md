# Short Music

A library-centric music player web app with minimal server requirements.

Written in [TypeScript](https://www.typescriptlang.org/) and built with:

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Router](https://reacttraining.com/react-router/)
- [Styled Components](https://www.styled-components.com/)

## Try it

### Demo

Check out the demo with content from the [Internet Archive Live Music Archive](https://archive.org/details/etree&tab=about):

- [https://short-music-demo.alexnorton.com/](https://short-music-demo.alexnorton.com/)

### Locally with Docker

Given you have [Docker](http://docker.com/) installed, clone this repository:

```bash
$ git clone https://github.com/alexnorton/short-music.git
```

Build the Docker image:

```bash
$ cd short-music/
$ docker build -f docker/Dockerfile -t short-music .
```

Start a Docker container, replacing `/path/to/music` with the path of a directory on your computer with music in it:

```bash
$ docker run --rm -v /path/to/music:/data:ro -p 8080:80 short-music
```

You should now be able to open [http://localhost:8080/](http://localhost:8080/) in a browser.
