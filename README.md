# Algorithms

Solutions to the exercises of the _Algorithms_ (2015) by Robert Sedgewick and Kevin Wayne (Fourth Editon Deluxe).  

<a href="url"><img src="assets/book_cover.jpg" align="right" height="280" width="200"></a>


### TypeScript

This repository contains a collection of implementations based on the book "Algorithms" by Robert Sedgewick. All code is written in TypeScript.

#### Prerequisites:

- Make sure you have [Node.js](https://nodejs.org/) installed.
- You'll also need TypeScript and `ts-node` installed globally. If you haven't installed them, run:
  ```bash
  npm install -g typescript ts-node
  ```

#### Running the code:

Each algorithm is implemented in its own TypeScript file. To run any of the implementations, use the following command:

```bash
ts-node <filename.ts>
```

Replace `<filename.ts>` with the name of the file you wish to run.


### Java

#### How to execute

```bash
java-algs4 <file-name>
```

### Python

#### How to setup

0. read [python documentation](https://github.com/pharrukh/lookup_repository/blob/master/python.md#pyenv---python-version-manager)
1. `pyenv install pypy3.10-7.3.12`
2. `pyenv virtualenv pypy3.10-7.3.12 algorithms`
3. `pyenv virtualenvs`

#### Development
1. start: `pyenv activate algorithms`
2. end: `pyenv deactivate algorithms`

#### How to execute

```bash
python <file-name>
```

### Acknoledgement

This repo is largely inspired by [algorithms-sedgewick-wayne](https://github.com/reneargento/algorithms-sedgewick-wayne/).
Thanks to [Rene Argento](https://github.com/reneargento) for being a beacon in the goal of solving every problem from Sedgewick and Wayne. 


### Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.

### License

This project is licensed under the MIT License.